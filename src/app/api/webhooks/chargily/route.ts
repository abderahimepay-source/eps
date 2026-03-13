import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAdminFirestore } from "@/firebase/admin"; // Updated import
import { FieldValue } from "firebase-admin/firestore"; // Correct import for server-side

/**
 * @fileOverview Webhook handler to receive payment notifications from Chargily Pay.
 */


export async function POST(req: NextRequest) {
  // 1. Get the signature
  const signature = req.headers.get("chargily-signature"); // Ensure this matches your dashboard setting
  const secretKey = process.env.CHARGILY_SECRET_KEY;
  
  if (!signature || !secretKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Get the RAW body for verification
  const body = await req.text();
  
  // 3. Compute Signature
  const computedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(body)
    .digest("hex");

  // Debugging: Log these in your Vercel/Firebase logs to see if they match
  // console.log("Received:", signature);
  // console.log("Computed:", computedSignature);

  if (computedSignature !== signature) {
    console.error("❌ Signature Mismatch");
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const event = JSON.parse(body);
  const firestore = getAdminFirestore();

  if (event.type === "checkout.paid") {
    const checkout = event.data;
    
    // Ensure metadata keys match exactly what you sent in 'initiateProSubscription'
    const userId = checkout.metadata?.userId; 
    const plan = checkout.metadata?.plan;

    if (!userId) {
      console.error("❌ No userId found in metadata:", checkout.metadata);
      return NextResponse.json({ error: "No userId" }, { status: 400 });
    }

    try {
      // Use a batch or a single update
      const userRef = firestore.collection("profiles").doc(userId);
      
      const creditAmount = plan === "PRO" ? 150 : 0; // Match your UI (150 credits for PRO)

      await userRef.update({
        isPro: true,
        credit_balance: FieldValue.increment(creditAmount),
        updatedAt: FieldValue.serverTimestamp(),
      });

      // Add transaction history
      await userRef.collection("credit_transactions").add({
        amount: creditAmount,
        transactionType: "Subscription_Purchase",
        description: `شراء باقة ${plan} عبر Chargily`,
        paymentId: checkout.id,
        createdAt: FieldValue.serverTimestamp(),
      });

      console.log(`✅ Success: User ${userId} upgraded to PRO.`);
      return NextResponse.json({ received: true });

    } catch (error) {
      console.error("❌ Firestore Error:", error);
      return NextResponse.json({ error: "DB Update Failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

// export async function POST(req: NextRequest) {
//   const signature = req.headers.get("chargily-signature");
//   const secretKey = process.env.CHARGILY_SECRET_KEY;
  
//   if (!signature || !secretKey) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const bodyText = await req.text();
  
//   const computedSignature = crypto
//     .createHmac("sha256", secretKey)
//     .update(bodyText)
//     .digest("hex");

//   if (computedSignature !== signature) {
//     return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
//   }

//   const event = JSON.parse(bodyText);
//   const firestore = getAdminFirestore(); // Get Firestore instance safely

//   if (event.type === "checkout.paid") {
//     const checkout = event.data;
    
//     const userId = checkout.metadata?.userId;
//     const plan = checkout.metadata?.plan;

//     if (userId && plan) {
//       try {
//         const userRef = firestore.collection("profiles").doc(userId);
        
//         let creditAmount = 0;
//         if (plan === "PRO") {
//           creditAmount = 500;
//         }

//         await userRef.update({
//           isPro: true,
//           credit_balance: FieldValue.increment(creditAmount),
//           updatedAt: FieldValue.serverTimestamp(),
//         });

//         const txRef = userRef.collection("credit_transactions");
//         await txRef.add({
//           amount: creditAmount,
//           transactionType: "Subscription_Purchase",
//           description: `شراء باقة ${plan} عبر Chargily`,
//           paymentId: checkout.id,
//           createdAt: FieldValue.serverTimestamp(),
//         });
//       } catch (error) {
//         console.error("Firestore Update Error in Webhook:", error);
//         return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 });
//       }
//     }
//   }

//   return NextResponse.json({ received: true });
// }
