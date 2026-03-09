
'use client';

import { 
  doc, 
  runTransaction, 
  increment, 
  serverTimestamp, 
  collection,
  Firestore
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const TOKENS_PER_CREDIT = 1000;

export interface TokenUsage {
  totalTokens: number;
  feature: string;
}

/**
 * Tracks AI usage by logging it and deducting credits from the user's profile.
 * Uses a transaction to ensure atomic updates to the credit_balance.
 */
export async function trackAiUsage(
  db: Firestore, 
  userId: string, 
  usage: TokenUsage,
  lessonPlanId?: string
) {
  const userRef = doc(db, 'profiles', userId);
  const usageLogRef = doc(collection(userRef, 'usage_logs'));
  const transactionRef = doc(collection(userRef, 'credit_transactions'));

  const creditsToBurn = Math.ceil(usage.totalTokens / TOKENS_PER_CREDIT);

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error("User profile not found");

      const currentBalance = userDoc.data().credit_balance || 0;
      if (currentBalance < creditsToBurn) {
        throw new Error("Insufficient credits");
      }

      // 1. Deduct from UserProfile
      transaction.update(userRef, {
        credit_balance: increment(-creditsToBurn),
        updatedAt: serverTimestamp(),
      });

      // 2. Create UsageLog
      transaction.set(usageLogRef, {
        id: usageLogRef.id,
        userId,
        aiFeatureUsed: usage.feature,
        tokensConsumed: usage.totalTokens,
        creditsBurned: creditsToBurn,
        modelMultiplier: 1.0,
        lessonPlanId: lessonPlanId || null,
        createdAt: serverTimestamp(),
      });

      // 3. Create CreditTransaction
      transaction.set(transactionRef, {
        id: transactionRef.id,
        userId,
        amount: -creditsToBurn,
        transactionType: 'AI_Deduction',
        description: `Deduction for ${usage.feature}`,
        usageLogId: usageLogRef.id,
        createdAt: serverTimestamp(),
      });
    });
  } catch (error: any) {
    errorEmitter.emit('permission-error', new FirestorePermissionError({
      path: userRef.path,
      operation: 'update',
      requestResourceData: { credit_balance: 'decrement' }
    }));
    throw error;
  }
}

/**
 * Increments the total lesson plans created count for a user.
 */
export async function incrementLessonPlanCount(db: Firestore, userId: string) {
  const userRef = doc(db, 'profiles', userId);
  try {
    await runTransaction(db, async (transaction) => {
      transaction.update(userRef, {
        totalLessonPlansCreated: increment(1),
        updatedAt: serverTimestamp(),
      });
    });
  } catch (error) {
    errorEmitter.emit('permission-error', new FirestorePermissionError({
      path: userRef.path,
      operation: 'update',
      requestResourceData: { totalLessonPlansCreated: 'increment' }
    }));
  }
}
