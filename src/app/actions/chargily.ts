'use server';
/**
 * @fileOverview Server actions for handling payment initiation.
 */

import { createChargilyCheckout } from "@/lib/chargily";

// Define a mapping for credit packs to DZD prices
// You can expand this with more credit tiers as needed
const CREDIT_PACK_PRICES: { [key: number]: number } = {
  150: 500, // PRO package: 150 credits for 500 DZD
  // Example for other credit packs:
  // 50: 200, // 50 credits for 200 DZD
  // 300: 900, // 300 credits for 900 DZD
};

export async function initiateChargilyCheckout(
  userId: string,
  creditsToBuy: number,
  isProUpgrade: boolean = false // New parameter to indicate if this is a PRO upgrade
) {
  if (!userId) throw new Error("User ID is required");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://studio-delta-tan.vercel.app";

  // Calculate amount in DZD based on creditsToBuy
  const amountDZD = CREDIT_PACK_PRICES[creditsToBuy];

  if (amountDZD === undefined) {
    throw new Error(`Invalid credit amount: ${creditsToBuy}. No defined price.`);
  }

  try {
    const checkout = await createChargilyCheckout({
      amount: amountDZD,
      currency: "dzd",
      successUrl: `${appUrl}/profile?payment=success&credits=${creditsToBuy}`, // Indicate credits bought
      failureUrl: `${appUrl}/profile?payment=cancel`, // Optional: add a failure URL
      metadata: {
        userId: userId,
        credits: creditsToBuy,
        isProUpgrade: isProUpgrade, // Pass whether this is a PRO upgrade
      },
    });

    return { checkoutUrl: checkout.checkout_url };
  } catch (error: any) {
    console.error("Action Error (initiateChargilyCheckout):", error);
    throw new Error(error.message || "فشل إنشاء طلب الدفع");
  }
}
