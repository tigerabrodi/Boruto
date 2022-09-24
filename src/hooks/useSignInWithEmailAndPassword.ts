import { useState } from 'react'
import { signInWithEmailAndPassword as signInWithEmailAndPasswordAuth } from '@firebase/auth'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../lib/firebase'
export const useSignInWithEmailAndPassword = () => {
  const [isSignInError, setIsSignInError] = useState(false)

  const navigate = useNavigate()

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      await signInWithEmailAndPasswordAuth(firebaseAuth, email, password)

      navigate('/')
    } catch (error) {
      setIsSignInError(true)
      setTimeout(() => {
        setIsSignInError(false)
      }, 3000)
    }
  }

  return {
    signInWithEmailAndPassword,
    isSignInError,
  }
}
