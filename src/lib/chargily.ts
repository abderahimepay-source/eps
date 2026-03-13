/**
 * @fileOverview Utility for interacting with Chargily Pay V2 API.
 */

const CHARGILY_URL = "https://pay.chargily.net/test/api/v2"; // Change to 'https://pay.chargily.net/api/v2' for production

export interface CreateCheckoutParams {
  amount: number;
  currency: "dzd";
  successUrl: string;
  metadata: any[]; // تم التغيير من Record إلى any[] ليتوافق مع تنسيق المصفوفة المستخدم في Chargily V2
}

export async function createChargilyCheckout(params: CreateCheckoutParams) {
  const secretKey = process.env.CHARGILY_SECRET_KEY;
  if (!secretKey) throw new Error("Missing CHARGILY_SECRET_KEY");

  const response = await fetch(`${CHARGILY_URL}/checkouts`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency,
      success_url: params.successUrl,
      metadata: params.metadata,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Chargily Error:", error);
    throw new Error(error.message || "Failed to create checkout");
  }

  return await response.json();
}
