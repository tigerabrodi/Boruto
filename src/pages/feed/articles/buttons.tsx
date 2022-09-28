import type { CollectionReference } from 'firebase/firestore'

import { setDoc } from 'firebase/firestore'
import { collection, deleteDoc, onSnapshot, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi'
import { MdOutlineBookmarkAdd } from 'react-icons/md'

import { useAuthContext } from '../../../context/AuthContext'
import { firebaseDb } from '../../../lib/firebase'

type ButtonsProps = {
  articleId: string
}

type Like = {
  likeId: string
  username: string
}

export function Buttons({ articleId }: ButtonsProps) {
  const [likes, setLikes] = useState<Like[]>([])
  const [hasLiked, setHasLiked] = useState(false)

  const { user } = useAuthContext()

  const likeCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/likes`
  ) as CollectionReference<Like>

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

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(
        doc(firebaseDb, `articles/${articleId}/likes/${user?.uid}`)
      )
    } else {
      await setDoc(
        doc(firebaseDb, `articles/${articleId}/likes/${user?.uid}`),
        {
          username: user?.email,
        }
      )
    }
  }
  return (
    <div className="buttons">
      <button className="bookmark" aria-label="Add article to your bookmark">
        <MdOutlineBookmarkAdd />
      </button>

      {hasLiked === true ? (
        <button
          className="button__like"
          aria-label="Like article"
          onClick={likePost}
        >
          <FiThumbsUp className="blue__thumb" />{' '}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
      ) : (
        <button
          aria-label="Like article"
          className="button__like"
          onClick={likePost}
        >
          <FiThumbsUp /> {likes.length > 0 && <span>{likes.length}</span>}
        </button>
      )}

      <button aria-label="Comment on article">
        <FiMessageSquare />
      </button>
    </div>
  )
}
