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
    
    // Extract userId and plan directly from the metadata object
    const userId = checkout.metadata?.userId;
    const plan = checkout.metadata?.plan;

    if (userId && plan) {
      try {
        const userRef = firestore.collection("profiles").doc(userId);
        
        let creditAmount = 0;
        if (plan === "PRO") {
          creditAmount = 150; // Set to 150 credits as per your requirement
        }

        // Update user status and credits
        await userRef.update({
          isPro: true,
          credit_balance: FieldValue.increment(creditAmount),
          updatedAt: FieldValue.serverTimestamp(),
        });

        // Log transaction
        const txRef = userRef.collection("credit_transactions");
        await txRef.add({
          amount: creditAmount,
          transactionType: "Subscription_Purchase",
          description: `شراء باقة ${plan} عبر Chargily`,
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
