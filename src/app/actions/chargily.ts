'use server';
/**
 * @fileOverview Server actions for handling payment initiation.
 */

import { createChargilyCheckout } from "@/lib/chargily";

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

    return { checkoutUrl: checkout.checkout_url };
  } catch (error: any) {
    console.error("Action Error:", error);
    throw new Error(error.message || "فشل إنشاء طلب الدفع");
  }
}
