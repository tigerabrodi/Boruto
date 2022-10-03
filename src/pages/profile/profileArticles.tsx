import type { ArticleType } from '../feed/blogArticles/blogArticles'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiBookOpen } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { firebaseDb } from '../../lib/firebase'

import '../user/user.css'

type ProfileArticlesProps = {
  username: string
  profileID: string | undefined
}
export function ProfileArticles({ profileID, username }: ProfileArticlesProps) {
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
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
