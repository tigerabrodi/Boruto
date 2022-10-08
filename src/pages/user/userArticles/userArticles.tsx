import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

// eslint-disable-next-line import/order
import { firebaseDb } from '../../../lib/firebase'

import '../../../styles/cardArticle.css'
import { UserArticle } from './userArticle'

export type UserArticleType = {
  coverUrl: string
  readMin: number
  subtitle: string
  text: string
  title: string
  uid: string
  articleId: string
}
export function UserArticles() {
  const [usersArticles, setUsersArticles] = useState<UserArticleType[]>([])
  const userArticlesCollectionReference = collection(
    firebaseDb,
    `articles`
  ) as CollectionReference<UserArticleType>

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
    <div className="user-articles">
      {usersArticles.map(({ coverUrl, uid, readMin, title, articleId }) => {
        return (
          <UserArticle
            key={articleId}
            coverUrl={coverUrl}
            readMin={readMin}
            subtitle={''}
            text={''}
            title={title}
            uid={uid}
            articleId={articleId}
          />
        )
      })}
    </div>
  )
}
