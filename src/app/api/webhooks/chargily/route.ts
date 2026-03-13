import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { initializeFirebase } from "@/firebase";
import { doc, updateDoc, increment, serverTimestamp, collection, addDoc } from "firebase/firestore";

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
  const { firestore } = initializeFirebase();

  if (event.type === "checkout.paid") {
    const checkout = event.data;
    
    // Extract userId from metadata array
    const userId = checkout.metadata?.find((m: any) => m.key === "userId")?.value;

    if (userId) {
      try {
        const userRef = doc(firestore, "profiles", userId);
        
        // Update user status and credits
        await updateDoc(userRef, {
          isPro: true,
          credit_balance: increment(150),
          updatedAt: serverTimestamp(),
        });

        // Log transaction
        const txRef = collection(userRef, "credit_transactions");
        await addDoc(txRef, {
          amount: 150,
          transactionType: "Subscription_Purchase",
          description: "شراء باقة المحترفين (PRO) عبر Chargily",
          paymentId: checkout.id,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Firestore Update Error in Webhook:", error);
        return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
