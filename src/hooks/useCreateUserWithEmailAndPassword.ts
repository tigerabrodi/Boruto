import type { FirebaseError } from '@firebase/util'

import { createUserWithEmailAndPassword as createUserWithEmailAndPasswordAuth } from '@firebase/auth'
import { doc, serverTimestamp, writeBatch } from '@firebase/firestore'
import { setDoc } from 'firebase/firestore'
import { useState } from 'react'

import { firebaseAuth, firebaseDb } from '../lib/firebase'

export const useCreateUserWithEmailAndPassword = () => {
  const [signUpError, setSignUpError] = useState<FirebaseError | null>(null)

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const user = await createUserWithEmailAndPasswordAuth(
        firebaseAuth,
        email,
        password
      )

      const bookmarkRef = doc(firebaseDb, 'bookmarks', email)

      setDoc(bookmarkRef, {
        savedArticles: [],
      })

      const userRef = doc(firebaseDb, `users/${user.user.uid}`)

      setDoc(userRef, {
        username,
        email,
        fullname: '',
        location: '',
        age: '',
        bio: '',
        avatarUrl: '',
        likeCount: 0,
        postCount: 0,
        createdAt: serverTimestamp(),
        uid: user.user.uid,
      })

      const usernameRef = doc(firebaseDb, `usernames/${username}`)
      setDoc(usernameRef, {
        uid: user.user?.uid,
      })
    } catch (error) {
      setSignUpError(error as FirebaseError)
      setTimeout(() => {
        setSignUpError(null)
      }, 3000)
    }
  }

  return {
    createUserWithEmailAndPassword,
    signUpError,
  }
}
