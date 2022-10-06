import './blogArticles.css'

import type { CollectionReference } from 'firebase/firestore'

import { query, orderBy, onSnapshot, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'

// import { useSkeletonContext } from '../../../context/SkeletonContext'
import { firebaseDb } from '../../../lib/firebase'
import { BlogArticle } from './blogArticle'
// import { Skeleton } from './skeleton/skeleton'

export type ArticleType = {
  uid: string
  text: string
  title: string
  readMin: string
  coverUrl: string
  articleId: string
}

export function BlogArticles() {
  const [articles, setArticles] = useState<ArticleType[]>([])
  // const { isLoading, setIsLoading } = useSkeletonContext()

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
    <div className="blog-articles">
      {articles.map(({ articleId, uid, text, title, readMin, coverUrl }) => {
        return (
          <BlogArticle
            key={articleId}
            uid={uid}
            text={text}
            title={title}
            articleId={articleId}
            readMin={readMin}
            coverUrl={coverUrl}
          />
        )
      })}
    </div>
  )
}
