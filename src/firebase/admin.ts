import * as admin from 'firebase-admin';

// This will hold the initialized Firestore instance.
let firestore: admin.firestore.Firestore;

/**
 * Returns a singleton instance of the Firebase Admin Firestore service.
 * It initializes the Firebase Admin SDK only on the first call.
 * This prevents the SDK from being initialized during the build process.
 */
export function getAdminFirestore() {
  if (!firestore) {
    // Get the service account key from environment variables.
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
    }

    // Initialize the app if it hasn't been already.
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
      });
    }

    // Get the Firestore instance.
    firestore = admin.firestore();
  }
  return firestore;
}
