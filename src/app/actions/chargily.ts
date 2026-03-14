'use server';
/**
 * @fileOverview Server actions for handling payment initiation.
 */

import { createChargilyCheckout } from "@/lib/chargily";
import { getAdminFirestore } from "@/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

export async function initiateProSubscription(userId: string) {
  if (!userId) throw new Error("User ID is required");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://studio-delta-tan.vercel.app";

  try {
    const checkout = await createChargilyCheckout({
      amount: 500,
      currency: "dzd",
      successUrl: `${appUrl}/profile?payment=success`,
      metadata: {
        userId: userId, 
        plan: "PRO",
        timestamp: Date.now().toString() // Added to ensure unique checkout ID
      }
    });

    // modify user subscription plan to PRO
    const db = getAdminFirestore();
    await db.collection("profiles").doc(userId).update({
      isPro: true,
      credit_balance: FieldValue.increment(500),
      plan: "PRO",
      updatedAt: FieldValue.serverTimestamp(),
    });



    return { checkoutUrl: checkout.checkout_url };
  } catch (error: any) {
    console.error("Action Error:", error);
    throw new Error(error.message || "فشل إنشاء طلب الدفع");
  }
}
