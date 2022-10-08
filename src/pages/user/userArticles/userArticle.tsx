import type { UserArticleType } from './userArticles'

import { Link } from 'react-router-dom'

import { useAuthContext } from '../../../context/AuthContext'
import { Author } from './author/author'

export function UserArticle({
  coverUrl,
  uid,
  readMin,
  title,
  articleId,
}: UserArticleType) {
  const { user } = useAuthContext()

  return (
    <>
      {uid === user?.uid && (
        <div className="user__article">
          <div
            className="user__article--image"
            style={{
              backgroundImage: `url(${coverUrl})`,
            }}
          />
          <Link to={`/article/${articleId}`} data-cy="users-article">
            {title}
          </Link>
          <Author readMin={readMin} id={uid} />
        </div>
      )}
    </>
  )
}
