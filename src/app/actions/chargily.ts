"use server";

import { createChargilyCheckout } from "@/lib/chargily";

// Define a mapping from credits to DZD price
const CREDIT_PACK_PRICES: { [key: number]: number } = {
  15: 100, // 15 credits for 100 DZD
  50: 300, // 50 credits for 300 DZD
  150: 500, // 150 credits for 500 DZD
};

export async function initiateChargilyCheckout(options: {
  userId: string;
  creditsToBuy: number;
  isProUpgrade: boolean;
}) {
  const { userId, creditsToBuy, isProUpgrade } = options;
  const amountDZD = CREDIT_PACK_PRICES[creditsToBuy];

  if (!amountDZD) {
    throw new Error("Invalid credit pack selected.");
  }

  // Determine the base URL dynamically from environment variables
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const response = await createChargilyCheckout({
      amount: amountDZD,
      currency: "dzd",
      successUrl: `${baseUrl}/payment-status?payment=success&credits=${creditsToBuy}`,
      failureUrl: `${baseUrl}/payment-status?payment=cancel`,
      webhookEndpointUrl: `${baseUrl}/api/webhooks/chargily`, // Explicitly provide the webhook URL
      metadata: {
        userId,
        credits: creditsToBuy,
        isProUpgrade,
        timestamp: Date.now().toString(),
      },
    });

    if (response && response.checkout_url) {
      return { checkoutUrl: response.checkout_url };
    }

    throw new Error("Failed to create Chargily checkout URL.");
  } catch (error) {
    console.error("Error creating Chargily checkout:", error);
    throw new Error("Could not initiate payment process.");
  }
}
