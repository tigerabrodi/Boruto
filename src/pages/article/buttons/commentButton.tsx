import type { CommentType } from '../container/container'
import type { ButtonsProps } from './index'
import type { CollectionReference } from 'firebase/firestore'

import { collection } from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { IoChatbubblesOutline } from 'react-icons/io5'

import { firebaseDb } from '../../../lib/firebase'

type CommentButtonProps = ButtonsProps

export function CommentButton({ articleId }: CommentButtonProps) {
  const [comments, setComments] = useState<CommentType[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/comments`
  ) as CollectionReference<CommentType>

  useEffect(() => {
    const getComments = async () =>
      onSnapshot(commentsCollectionReference, (snapshot) => {
        return setComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      })

    return () => {
      getComments()
    }
  }, [firebaseDb, articleId])
  return (
    <button>
      <IoChatbubblesOutline className="chat-icon" />
      {comments.length > 0 && <span>{comments.length}</span>}
    </button>
  )
}
