import './articles.css'

import type { CollectionReference } from 'firebase/firestore'

import { query, orderBy, onSnapshot, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDb } from '../../../lib/firebase'
import { Article } from './article'

export type ArticleType = {
  id: string
  text: string
  title: string
  readMin: string
  coverUrl: string
  articleId: string
}

export function Articles() {
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
    <div className="posts">
      {articles.map(({ articleId, id, text, title, readMin, coverUrl }) => {
        return (
          <Article
            key={articleId}
            id={id}
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
