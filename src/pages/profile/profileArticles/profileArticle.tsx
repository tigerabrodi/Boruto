import { Link } from 'react-router-dom'

import { Author } from './[profile-author]/author'

type ProfileArticleType = {
  profileID: string | undefined
  username: string
  coverUrl: string
  readMin: number
  title: string
  uid: string
  articleId: string
  id: string
}

export function ProfileArticle({
  profileID,
  username,
  coverUrl,
  readMin,
  title,
  uid,
  articleId,
}: ProfileArticleType) {
  return (
    <>
      {profileID === uid && (
        <div className="user__article">
          <div
            className="user__article--image"
            style={{
              backgroundImage: `url(${coverUrl})`,
            }}
          />
          <Link to={`/article/${articleId}`}>{title}</Link>
          <Author readMin={readMin} username={username} />
        </div>
      )}
    </>
  )
}
