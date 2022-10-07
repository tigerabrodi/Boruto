import type { CollectionReference } from 'firebase/firestore'

import { onSnapshot, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi'
import { MdOutlineBookmarkAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { firebaseDb } from '../../../../lib/firebase'

type CommentType = {
  articleId: 'string'
  comment: string
  commentUid: string
  timestamp: {
    nanoseconds: number
    seconds: number
  }
}

type LikeType = {
  article: string
  likeUid: string
}

type ButtonsProps = {
  title: string
  articleId: string
}

export function Buttons({ articleId, title }: ButtonsProps) {
  const [likes, setLikes] = useState<LikeType[] | undefined>([])
  const [comments, setComments] = useState<CommentType[] | undefined>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/comments`
  ) as CollectionReference<CommentType>

  const likesCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/likes`
  ) as CollectionReference<LikeType>

  useEffect(() => {
    const unsubscribe = onSnapshot(commentsCollectionReference, (snapshot) =>
      setComments(snapshot.docs.map((doc) => ({ ...doc.data() })))
    )

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(likesCollectionReference, (snapshot) =>
      setLikes(snapshot.docs.map((doc) => ({ ...doc.data() })))
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="buttons">
      <Link
        to={`/article/${articleId}`}
        className="bookmark"
        aria-label={`Go to article "${title}"  `}
      >
        <MdOutlineBookmarkAdd />
      </Link>

      <Link
        to={`/article/${articleId}`}
        aria-label={`Go to article "${title}"  `}
      >
        <FiMessageSquare />{' '}
        {comments?.length > 0 && <span>{comments?.length}</span>}
      </Link>
      <Link
        to={`/article/${articleId}`}
        aria-label={`Go to article "${title}"  `}
        className="button__like"
      >
        <FiThumbsUp /> {likes?.length > 0 && <span>{likes?.length}</span>}
      </Link>
    </div>
  )
}
