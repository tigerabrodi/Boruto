import type { CommentType } from '../container'
import type { CollectionReference } from 'firebase/firestore'

import { collection } from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDb } from '../../../../lib/firebase'

type CommentsLengthProps = {
  articleId: string | undefined
}
export default function CommentsLength({ articleId }: CommentsLengthProps) {
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
    <div>
      {comments.length > 0 ? (
        <p>Comments ({comments.length})</p>
      ) : (
        <p>Comments</p>
      )}
    </div>
  )
}
