import type { UserArticleType } from '../../user/userArticles/userArticles'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDb } from '../../../lib/firebase'
import { ProfileArticle } from './profileArticle'

type ProfileArticlesType = {
  profileID: string | undefined
  username: string
  id: string
}
export function ProfileArticles({
  profileID,
  username,
  id,
}: ProfileArticlesType) {
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
          <ProfileArticle
            key={articleId}
            coverUrl={coverUrl}
            readMin={readMin}
            title={title}
            uid={uid}
            articleId={articleId}
            profileID={profileID}
            username={username}
            id={id}
          />
        )
      })}
    </div>
  )
}
