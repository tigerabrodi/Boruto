import type { CollectionReference } from 'firebase/firestore'

import { setDoc } from 'firebase/firestore'
import { collection, deleteDoc, onSnapshot, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi'
import { MdOutlineBookmarkAdd } from 'react-icons/md'

import { InfoModule } from '../../../components/modals/InfoModule'
import { useAuthContext } from '../../../context/AuthContext'
import { useInfoModuleContext } from '../../../context/InfoModuleContext'
import { firebaseDb } from '../../../lib/firebase'

import './buttons.css'

type ButtonsProps = {
  dataId: string
}

type Like = {
  likeId: string
  username: string
}
export function Buttons({ dataId }: ButtonsProps) {
  const { isOpen, setIsOpen } = useInfoModuleContext()
  const [likes, setLikes] = useState<Like[]>([])
  const [hasLiked, setHasLiked] = useState(false)

  const { user } = useAuthContext()

  //   const likeCollectionReference = collection(
  //     firebaseDb,
  //     `articles/${articleId}/likes`
  //   ) as CollectionReference<Like>

  //   useEffect(
  //     () =>
  //       onSnapshot(likeCollectionReference, (snapshot) =>
  //         setLikes(
  //           snapshot.docs.map((doc) => ({ ...doc.data(), likeId: doc.id }))
  //         )
  //       ),
  //     [firebaseDb, articleId]
  //   )

  //   useEffect(
  //     () =>
  //       setHasLiked(likes.findIndex((like) => like.likeId === user?.uid) !== -1),
  //     [likes]
  //   )

  //   const likePost = async () => {
  //     if (hasLiked) {
  //       await deleteDoc(
  //         doc(firebaseDb, `articles/${articleId}/likes/${user?.uid}`)
  //       )
  //     } else {
  //       await setDoc(
  //         doc(firebaseDb, `articles/${articleId}/likes/${user?.uid}`),
  //         {
  //           username: user?.email,
  //         }
  //       )
  //     }
  //   }
  return (
    <div className="container__buttons">
      {isOpen === true && <InfoModule />}

      {/* {user?.email ? (
        <div className="buttons">
          <button
            className="bookmark"
            aria-label="Add article to your bookmark"
          >
            <MdOutlineBookmarkAdd />
          </button>

          {hasLiked === true ? (
            <button
              className="button__like"
              aria-label="Like article"
            //   onClick={likePost}
            >
              <FiThumbsUp className="blue__thumb" />{' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
          ) : (
            <button
              aria-label="Like article"
              className="button__like"
            //   onClick={likePost}
            >
              <FiThumbsUp /> {likes.length > 0 && <span>{likes.length}</span>}
            </button>
          )}

          <button aria-label="Comment on article">
            <FiMessageSquare />
          </button>
        </div>
      ) : (
        <div className="buttons">
          <button
            className="bookmark"
            aria-label="Add article to your bookmark"
            onClick={() => setIsOpen(true)}
          >
            <MdOutlineBookmarkAdd />
          </button>

          <button
            className="button__like"
            aria-label="Like article"
            onClick={() => setIsOpen(true)}
          >
            <FiThumbsUp /> {likes.length > 0 && <span>{likes.length}</span>}
          </button>

          <button
            aria-label="Comment on article"
            onClick={() => setIsOpen(true)}
          >
            <FiMessageSquare />
          </button>
        </div>
      )} */}
      <button
        aria-label="Like article"
        className="button__like"
        //   onClick={likePost}
      >
        <FiThumbsUp /> {likes.length > 0 && <span>{likes.length}</span>}
      </button>

      <button aria-label="Comment on article">
        <FiMessageSquare />
      </button>
      <button className="bookmark" aria-label="Add article to your bookmark">
        <MdOutlineBookmarkAdd />
      </button>
    </div>
  )
}
