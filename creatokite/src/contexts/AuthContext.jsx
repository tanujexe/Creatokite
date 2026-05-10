import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';

const AuthContext = createContext(null);

const PROFILE_CACHE_PREFIX = 'creatokite:profile:';

function cacheProfile(uid, profileData) {
  try {
    localStorage.setItem(
      `${PROFILE_CACHE_PREFIX}${uid}`,
      JSON.stringify(profileData)
    );
  } catch {
    // Ignore cache failures.
  }
}

function readCachedProfile(uid) {
  try {
    const raw = localStorage.getItem(`${PROFILE_CACHE_PREFIX}${uid}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearCachedProfile(uid) {
  try {
    localStorage.removeItem(`${PROFILE_CACHE_PREFIX}${uid}`);
  } catch {
    // Ignore cache failures.
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to auth state changes
  useEffect(() => {
    // Safety timeout to prevent infinite loading if Firebase hangs
    const timer = setTimeout(() => {
      setLoading((prev) => {
        if (prev) {
          console.warn('Auth loading timed out. Proceeding with fallback.');
          return false;
        }
        return prev;
      });
    }, 10000);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // 1. Try to set profile from cache immediately
        const cachedProfile = readCachedProfile(firebaseUser.uid);
        if (cachedProfile) {
          setProfile(cachedProfile);
        } else {
          // 2. Set a skeleton profile so App.jsx doesn't hang
          setProfile({ 
            uid: firebaseUser.uid, 
            role: localStorage.getItem('creatokite:lastRole') || 'creator',
            isPlaceholder: true 
          });
        }
        
        setLoading(false); // Stop "Authenticating..." spinner
        
        // 3. Refresh from Firestore in the background
        await loadProfile(firebaseUser.uid);
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
      clearTimeout(timer);
    });
    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  async function loadProfile(uid) {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        const freshProfile = snap.data();
        setProfile(freshProfile);
        cacheProfile(uid, freshProfile);
        if (freshProfile.role) {
          localStorage.setItem('creatokite:lastRole', freshProfile.role);
        }
      } else {
        // Fallback for cases where Auth user exists but Firestore doc doesn't
        const fallback = {
          uid,
          email: auth.currentUser?.email || '',
          displayName: auth.currentUser?.displayName || 'User',
          role: localStorage.getItem('creatokite:lastRole') || 'creator',
          isFallback: true
        };
        setProfile(fallback);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      const cachedProfile = readCachedProfile(uid);
      if (cachedProfile) {
        setProfile(cachedProfile);
      } else {
        // Even on error, set a fallback so the app isn't stuck
        setProfile({ uid, role: 'creator', isError: true });
      }
      
      if (err && /client is offline/i.test(err.message || '')) {
        toast.error('Network offline. Using cached/default profile.');
      }
    }
  }

  // Create user document in Firestore
  async function createUserDoc(firebaseUser, role = 'creator', extra = {}) {
    const ref = doc(db, 'users', firebaseUser.uid);
    const snap = await getDoc(ref);
    
    if (!snap.exists()) {
      // New user
      const data = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || extra.displayName || 'Creator',
        photoURL: firebaseUser.photoURL || '',
        role: role, // Use the role they signed up with
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        ...extra,
      };
      await setDoc(ref, data);
      setProfile(data);
      cacheProfile(firebaseUser.uid, data);
      localStorage.setItem('creatokite:lastRole', role);

      // Create role-specific documents
      if (role === 'creator') {
        await setDoc(doc(db, 'creators', firebaseUser.uid), {
          uid: firebaseUser.uid,
          joinedAt: serverTimestamp(),
          isVerified: false,
          trustScore: 50,
          totalEarnings: 0,
        });
      } else if (role === 'brand') {
        await setDoc(doc(db, 'brands', firebaseUser.uid), {
          uid: firebaseUser.uid,
          companyName: extra.companyName || '',
          joinedAt: serverTimestamp(),
          isVerified: false,
        });
      }
    } else {
      // Existing user
      const existingData = snap.data();
      const updateData = { lastLoginAt: serverTimestamp() };
      
      // If logging in as admin and they aren't admin, or if they have no role
      if (role === 'admin' && existingData.role !== 'admin') {
        updateData.role = 'admin';
      }
      
      await setDoc(ref, updateData, { merge: true });
      const finalProfile = { ...existingData, ...updateData };
      setProfile(finalProfile);
      cacheProfile(firebaseUser.uid, finalProfile);
      localStorage.setItem('creatokite:lastRole', finalProfile.role);
    }
  }

  // Register with email & password
  async function registerWithEmail(
    email,
    password,
    displayName,
    role = 'creator',
    extra = {}
  ) {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName });
      await createUserDoc(cred.user, role, { displayName, ...extra });
      return cred;
    } finally {
      setLoading(false);
    }
  }

  // Login with email & password
  async function loginWithEmail(email, password) {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  }

  // Login with Google
  async function loginWithGoogle(role = 'creator') {
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      // For admin role via Google, also allow role upgrade on existing accounts
      await createUserDoc(cred.user, role);
      return cred;
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in cancelled. Please keep the popup open to finish.');
      }
      if (err.code === 'auth/cancelled-popup-request') {
        throw new Error('Previous sign-in attempt cancelled. Please try again.');
      }
      if (err.code === 'auth/popup-blocked') {
        throw new Error('Sign-in popup blocked by browser. Please allow popups for this site.');
      }
      console.error('Google Sign-in Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Logout
  async function logout() {
    if (user?.uid) clearCachedProfile(user.uid);
    await signOut(auth);
    toast.success('Logged out successfully');
  }

  // Password reset
  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
    toast.success('Password reset email sent!');
  }

  const value = {
    user,
    profile,
    loading,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
    resetPassword,
    refreshProfile: () => user && loadProfile(user.uid),
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader full message="Authenticating..." /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
