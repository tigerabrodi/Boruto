import type { CommentType } from '../container/container'
import type { CollectionReference } from 'firebase/firestore'

import { collection } from 'firebase/firestore'
import { onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDb } from '../../../lib/firebase'
import { Comment } from './comment'

type CommentsProps = {
  articleId: string | undefined
}

export function Comments({ articleId }: CommentsProps) {
  const [comments, setComments] = useState<CommentType[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/comments`
  ) as CollectionReference<CommentType>

  useEffect(() => {
    const getComments = async () =>
      onSnapshot(
        query(commentsCollectionReference, orderBy('timestamp', 'desc')),
        (snapshot) => {
          return setComments(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        }
      )

    return () => {
      getComments()
    }
  }, [firebaseDb, articleId])

  return (
    <div className="comments">
      {comments.map(({ comment, commentUid, id }) => {
        return (
          <Comment
            comment={comment}
            commentUid={commentUid}
            key={id}
            id={''}
            timestamp={{
              seconds: 0,
              nanoseconds: 0,
            }}
          />
        )
      })}
    </div>
  )
}
