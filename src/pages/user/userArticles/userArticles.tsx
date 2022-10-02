import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuthContext } from '../../../context/AuthContext'
// eslint-disable-next-line import/order
import { firebaseDb } from '../../../lib/firebase'

import '../user.css'
import { Author } from './author'

type UserArticles = {
  coverUrl: string
  id: string
  readMin: number
  subtitle: string
  text: string
  title: string
  uid: string
  articleId: string
}
export function UserArticles() {
  const { user } = useAuthContext()
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
      {usersArticles.map(({ coverUrl, id, readMin, title, articleId }) => {
        return (
          <div className="user__articles" key={articleId}>
            {id === user?.uid && (
              <div className="user__article">
                <div
                  className="user__article--image"
                  style={{
                    backgroundImage: `url(${coverUrl})`,
                  }}
                />
                <Link to={`/article/${articleId}`}>
                  <h1>{title}</h1>
                </Link>
                <Author readMin={readMin} />
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
