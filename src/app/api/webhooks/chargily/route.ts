import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAdminFirestore } from "@/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * @fileOverview Webhook handler to receive payment notifications from Chargily Pay.
 */

export async function POST(req: NextRequest) {
  const signature = req.headers.get("chargily-signature");
  const secretKey = process.env.CHARGILY_SECRET_KEY;
  
  if (!signature || !secretKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bodyText = await req.text();
  
  const computedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(bodyText)
    .digest("hex");

  if (computedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const event = JSON.parse(bodyText);
  const firestore = getAdminFirestore();

  if (event.type === "checkout.paid") {
    const checkout = event.data;
    
    // Extract userId, credits, and isProUpgrade directly from the metadata object
    const userId = checkout.metadata?.userId;
    const creditsToAward = checkout.metadata?.credits;
    const isProUpgrade = checkout.metadata?.isProUpgrade || false; // Default to false

    if (userId && creditsToAward !== undefined) {
      try {
        const userRef = firestore.collection("profiles").doc(userId);
        
        const updateData: { [key: string]: any } = {
          credit_balance: FieldValue.increment(creditsToAward),
          updatedAt: FieldValue.serverTimestamp(),
        };

        if (isProUpgrade) {
          updateData.isPro = true;
        }

        // Update user status and credits
        await userRef.update(updateData);

        // Log transaction
        const txRef = userRef.collection("credit_transactions");
        await txRef.add({
          amount: creditsToAward,
          transactionType: isProUpgrade ? "PRO_Subscription_Purchase" : "Credit_Recharge",
          description: isProUpgrade ? `شراء باقة المحترفين (PRO) عبر Chargily ( ${creditsToAward} اعتماد)` : `شحن رصيد عبر Chargily ( ${creditsToAward} اعتماد)`,
          paymentId: checkout.id,
          createdAt: FieldValue.serverTimestamp(),
        });
      } catch (error) {
        console.error("Firestore Update Error in Webhook:", error);
        return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
