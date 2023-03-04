import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth'

// SIM's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize auth
export const auth = getAuth(app)

// Initialize Google auth provider
const authProvider = new GoogleAuthProvider()

// Handler function for login button click event
export const signInWithGoogle = async (): Promise<User> => {
  const resp: UserCredential = await signInWithPopup(auth, authProvider)
  return resp.user
}

export const signOutWithGoogle = () => signOut(auth)
