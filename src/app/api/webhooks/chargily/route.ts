import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAdminFirestore } from "@/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * @fileOverview Webhook handler to receive payment notifications from Chargily Pay.
 */

export async function POST(req: NextRequest) {
  console.log("Chargily Webhook received a request.");
  const signature = req.headers.get("signature"); // FIX: Changed header name to 'signature'
  const secretKey = process.env.CHARGILY_SECRET_KEY;

  console.log("Incoming Signature:", signature);
  console.log("CHARGILY_SECRET_KEY (from env):", secretKey ? "SET" : "NOT SET");
  
  if (!signature || !secretKey) {
    console.error("Webhook Error: Unauthorized - Missing signature or secretKey.");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bodyText = await req.text();
  console.log("Webhook Body Text:", bodyText);
  
  const computedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(bodyText)
    .digest("hex");

  console.log("Computed Signature:", computedSignature);
  console.log("Original Signature:", signature);

  if (computedSignature !== signature) {
    console.error("Webhook Error: Invalid signature - Signatures do not match.");
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const event = JSON.parse(bodyText);
  console.log("Parsed Webhook Event Type:", event.type);
  console.log("Parsed Webhook Event Data:", event.data);

  const firestore = getAdminFirestore();

  if (event.type === "checkout.paid") {
    console.log("Webhook Event Type is checkout.paid. Processing...");
    const checkout = event.data;
    
    // Extract userId, credits, and isProUpgrade directly from the metadata object
    const userId = checkout.metadata?.userId;
    const creditsToAward = checkout.metadata?.credits;
    const isProUpgrade = checkout.metadata?.isProUpgrade || false; // Default to false

    console.log("Extracted userId:", userId);
    console.log("Extracted creditsToAward:", creditsToAward);
    console.log("Extracted isProUpgrade:", isProUpgrade);

    if (userId && creditsToAward !== undefined) {
      try {
        console.log(`Attempting to update user ${userId} with ${creditsToAward} credits and isProUpgrade: ${isProUpgrade}.`);
        const userRef = firestore.collection("profiles").doc(userId);
        
        const updateData: { [key: string]: any } = {
          credit_balance: FieldValue.increment(creditsToAward),
          updatedAt: FieldValue.serverTimestamp(),
        };

        if (isProUpgrade) {
          updateData.isPro = true;
        }

        await userRef.update(updateData);
        console.log(`Successfully updated user ${userId}.`);

        // Log transaction
        const txRef = userRef.collection("credit_transactions");
        await txRef.add({
          amount: creditsToAward,
          transactionType: isProUpgrade ? "PRO_Subscription_Purchase" : "Credit_Recharge",
          description: isProUpgrade ? `شراء باقة المحترفين (PRO) عبر Chargily ( ${creditsToAward} اعتماد)` : `شحن رصيد عبر Chargily ( ${creditsToAward} اعتماد)`,
          paymentId: checkout.id,
          createdAt: FieldValue.serverTimestamp(),
        });
        console.log(`Successfully logged transaction for user ${userId}.`);

      } catch (error) {
        console.error("Firestore Update Error in Webhook:", error);
        return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 });
      }
    } else {
      console.warn("Webhook Warning: Missing userId or creditsToAward in metadata.", { userId, creditsToAward });
    }
  } else {
    console.log("Webhook Event Type is not checkout.paid. Ignoring.");
  }

  console.log("Webhook processing finished successfully.");
  return NextResponse.json({ received: true });
}
