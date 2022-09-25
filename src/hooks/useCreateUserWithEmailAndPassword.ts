import * as React from 'react'
import { doc, serverTimestamp, writeBatch } from '@firebase/firestore'
import { createUserWithEmailAndPassword as createUserWithEmailAndPasswordAuth } from '@firebase/auth'
import { firebaseAuth, firebaseDb } from '../lib/firebase'
import { FirebaseError } from '@firebase/util'

export const useCreateUserWithEmailAndPassword = () => {
  const [signUpError, setSignUpError] = React.useState<FirebaseError | null>(
    null
  )

  const batch = writeBatch(firebaseDb)

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

      const userRef = doc(firebaseDb, `users/${user.user.uid}`)

      batch.set(userRef, {
        username,
        email,
        fullname: '',
        age: '',
        bio: '',
        avatarUrl: '',
        likeCount: 0,
        postCount: 0,
        createdAt: serverTimestamp(),
        uid: user.user.uid,
      })

      const usernameRef = doc(firebaseDb, `usernames/${username}`)
      batch.set(usernameRef, {
        uid: user.user?.uid,
      })

      await batch.commit()
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
