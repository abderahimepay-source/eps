/**
 * @fileOverview Utility for interacting with Chargily Pay V2 API.
 */

const CHARGILY_URL = "https://pay.chargily.net/test/api/v2"; // Change to 'https://pay.chargily.net/api/v2' for production

export interface CreateCheckoutParams {
  amount: number;
  currency: "dzd";
  successUrl: string;
  failureUrl?: string;
  webhookEndpointUrl?: string; // Explicitly define the webhook URL for this checkout
  metadata: Record<string, any>;
}

export async function createChargilyCheckout(params: CreateCheckoutParams) {
  const secretKey = process.env.CHARGILY_SECRET_KEY;
  if (!secretKey) {
    throw new Error("The CHARGILY_SECRET_KEY environment variable is not set. Please add it to your .env.local file and your Vercel project settings.");
  }

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
      failure_url: params.failureUrl,
      webhook_endpoint_url: params.webhookEndpointUrl, // Pass the webhook URL to Chargily API
      metadata: params.metadata,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Chargily API Error:", errorBody);
    throw new Error(`Chargily API responded with status ${response.status}`);
  }

  return response.json();
}
