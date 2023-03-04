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
  apiKey: 'AIzaSyA-c1IP0V8YGToNklF1H6VZUCVOOvZOXuo',
  authDomain: 'skyrim-inventory-management.firebaseapp.com',
  projectId: 'skyrim-inventory-management',
  storageBucket: 'skyrim-inventory-management.appspot.com',
  messagingSenderId: '891031345873',
  appId: '1:891031345873:web:00be79e23fca3ff1e043f0',
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
