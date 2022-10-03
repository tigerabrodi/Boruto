import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiEdit3, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { DeleteArticleModal } from '../../../components/modals/DeleteArticleModal'
import { useAuthContext } from '../../../context/AuthContext'
// eslint-disable-next-line import/order
import { firebaseDb } from '../../../lib/firebase'

import '../user.css'
import { Author } from './author'

type UserArticles = {
  coverUrl: string
  readMin: number
  subtitle: string
  text: string
  title: string
  uid: string
  articleId: string
}
export function UserArticles() {
  const { user } = useAuthContext()
  const [openModal, setOpenModal] = useState(false)
  const [usersArticles, setUsersArticles] = useState<UserArticles[]>([])
  const userArticlesCollectionReference = collection(
    firebaseDb,
    `articles`
  ) as CollectionReference<UserArticles>

  useEffect(() => {
    const getUserArticles = onSnapshot(
      userArticlesCollectionReference,
      (snapshot) => {
        setUsersArticles(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            articleId: doc.id,
          }))
        )
      }
    )

    return () => {
      getUserArticles()
    }
  }, [firebaseDb])

  return (
    <>
      {usersArticles.map(({ coverUrl, uid, readMin, title, articleId }) => {
        return (
          <div className="user__articles" key={articleId}>
            {uid === user?.uid && (
              <div className="user__article">
                {openModal === true && (
                  <DeleteArticleModal
                    articleId={articleId}
                    setOpenModal={setOpenModal}
                  />
                )}
                <div
                  className="user__article--image"
                  style={{
                    backgroundImage: `url(${coverUrl})`,
                  }}
                />
                <Link to={`/article/${articleId}`}>{title}</Link>
                <Author readMin={readMin} id={uid} />
                <>
                  <button
                    className="user__articles--edit"
                    aria-label="Edit your blog article"
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="user__articles--delete"
                    aria-label="Delete your blog article"
                  >
                    <FiX />
                  </button>
                </>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
