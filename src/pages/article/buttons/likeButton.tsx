import type { ButtonsProps } from './index'
import type { CollectionReference } from 'firebase/firestore'

import {
  collection,
  deleteDoc,
  onSnapshot,
  setDoc,
  doc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiThumbsUp } from 'react-icons/fi'

import { useAuthContext } from '../../../context/AuthContext'
import { firebaseDb } from '../../../lib/firebase'

type LikeButtonProps = ButtonsProps

type Like = {
  likeUid: string
  article: string
  likeId: string
}

export function LikeButton({ articleId }: LikeButtonProps) {
  const [likes, setLikes] = useState<Like[]>([])
  const [hasLiked, setHasLiked] = useState(false)
  const likeCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/likes/`
  ) as CollectionReference<Like>

  const { user } = useAuthContext()

  useEffect(
    () =>
      onSnapshot(likeCollectionReference, (snapshot) =>
        setLikes(
          snapshot.docs.map((doc) => ({ ...doc.data(), likeId: doc.id }))
        )
      ),
    [firebaseDb, articleId]
  )

  useEffect(
    () =>
      setHasLiked(likes.findIndex((like) => like.likeId === user?.uid) !== -1),
    [likes]
  )

  const likeArticle = async () => {
    if (hasLiked) {
      await deleteDoc(
        doc(firebaseDb, `articles/${articleId}/likes/${user?.uid}`)
      )
    } else {
      await setDoc(
        doc(firebaseDb, `articles/${articleId}/likes/${user?.uid}`),
        {
          likeUid: user?.uid,
          article: articleId,
        }
      )
    }
  }
  return (
    <>
      {hasLiked ? (
        <button onClick={likeArticle}>
          <FiThumbsUp className="like-icon blue-thumb" />{' '}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
      ) : (
        <button onClick={likeArticle}>
          <FiThumbsUp className="like-icon " />{' '}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
      )}
    </>
  )
}
