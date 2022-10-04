import type { ArticleType } from '../feed/blogArticles/blogArticles'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiBookOpen, FiEdit3, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

// eslint-disable-next-line import/order
import { firebaseDb } from '../../lib/firebase'

import '../user/user.css'
// eslint-disable-next-line import/order
import { useAuthContext } from '../../context/AuthContext'
// eslint-disable-next-line import/order
import { DeleteArticleModal } from '../../components/modals/DeleteArticleModal'

type ProfileArticlesProps = {
  username: string
  id: string
  profileID: string | undefined
}
export function ProfileArticles({
  profileID,
  username,
  id,
}: ProfileArticlesProps) {
  const { user } = useAuthContext()
  const [openModal, setOpenModal] = useState(false)
  const [articles, setArticles] = useState<ArticleType[]>([])

  const ArticlesCollectionReference = collection(
    firebaseDb,
    'articles'
  ) as CollectionReference<ArticleType>

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(ArticlesCollectionReference, orderBy('timestamp', 'desc')),
      (snapshot) => {
        setArticles(
          snapshot.docs.map((doc) => ({ ...doc.data(), articleId: doc.id }))
        )
      }
    )

    return () => {
      unsubscribe()
    }
  }, [firebaseDb])

  return (
    <div className="user__articles">
      {articles.map(({ uid, title, readMin, coverUrl, articleId }) => {
        return (
          <div key={articleId}>
            {profileID === uid && (
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
                <div className="user__article--author">
                  <p>@{username}</p>
                  <p>
                    <FiBookOpen className="icon" />
                    {readMin} read min
                  </p>
                </div>
                {user?.uid === id && (
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
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
