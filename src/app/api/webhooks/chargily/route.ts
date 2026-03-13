import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { initializeFirebase } from "@/firebase";
import { doc, updateDoc, increment, serverTimestamp, collection, addDoc } from "firebase/firestore";

/**
 * @fileOverview معالج الـ Webhook لاستقبال إشعارات الدفع من Chargily Pay.
 */

export async function POST(req: NextRequest) {
  const signature = req.headers.get("chargily-signature");
  const secretKey = process.env.CHARGILY_SECRET_KEY;
  
  // التحقق من وجود المفتاح والتوقيع لضمان الأمان
  if (!signature || !secretKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bodyText = await req.text();
  
  // التحقق من صحة التوقيع (Signature Verification) لمنع التزوير
  const computedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(bodyText)
    .digest("hex");

  if (computedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const event = JSON.parse(bodyText);
  const { firestore } = initializeFirebase();

  // معالجة حدث نجاح الدفع
  if (event.type === "checkout.paid") {
    const checkout = event.data;
    const userId = checkout.metadata?.userId;

    if (userId) {
      const userRef = doc(firestore, "profiles", userId);
      
      // 1. تحديث حساب المستخدم إلى باقة المحترفين وإضافة رصيد
      await updateDoc(userRef, {
        isPro: true,
        credit_balance: increment(150), // إضافة 150 اعتماداً
        updatedAt: serverTimestamp(),
      });

      // 2. تسجيل العملية في سجل المعاملات المالية
      const txRef = collection(userRef, "credit_transactions");
      await addDoc(txRef, {
        amount: 150,
        transactionType: "Subscription_Purchase",
        description: "شراء باقة المحترفين (PRO) عبر Chargily",
        paymentId: checkout.id,
        createdAt: serverTimestamp(),
      });
    }
  }

  return NextResponse.json({ received: true });
}
