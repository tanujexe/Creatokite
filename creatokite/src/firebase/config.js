// ============================================================
// CREATOKITE — Firebase Configuration
// ============================================================
// HOW TO SET UP:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project named "creatokite"
// 3. Enable Authentication → Email/Password + Google providers
// 4. Create Firestore Database in production mode
// 5. Add your web app → copy config values below
// 6. Replace ALL values that say "YOUR_..." with your actual Firebase values
// ============================================================

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL || 'YOUR_DATABASE_URL',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'creatokite-33db9',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'YOUR_MEASUREMENT_ID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Firestore
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

// Analytics (only in browser)
export const analytics =
  typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;

// ============================================================
// FIRESTORE COLLECTIONS STRUCTURE
// ============================================================
// users/{uid}
//   - uid, email, displayName, photoURL, role ('creator'|'brand'|'admin')
//   - createdAt, lastLoginAt
//
// creators/{uid}
//   - bio, niche[], platforms{}, followerCount, engagementRate
//   - location, isVerified, trustScore, rating, totalEarnings
//   - completedCampaigns, joinedAt
//
// brands/{uid}
//   - companyName, industry, website, logo
//   - totalSpend, activeCampaigns, isVerified
//
// campaigns/{campaignId}
//   - brandId, title, description, niche, budget, deadline
//   - status ('draft'|'active'|'completed'|'paused')
//   - creatorIds[], requirements, deliverables
//   - createdAt, updatedAt
//
// applications/{applicationId}
//   - campaignId, creatorId, brandId
//   - status ('pending'|'approved'|'rejected'|'completed')
//   - submission{url, caption, postedAt}
//   - payment{amount, status, paidAt}
//   - appliedAt, updatedAt
//
// notifications/{notifId}
//   - userId, title, message, type, read, createdAt
// ============================================================
