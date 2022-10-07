import { useState } from 'react'
import { FiEdit3, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { DeleteArticleModal } from '../../../components/modals/DeleteArticleModal'
import { useAuthContext } from '../../../context/AuthContext'
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
  const { user } = useAuthContext()
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
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
          <Author readMin={readMin} username={username} />

          {uid === user?.uid && (
            <>
              <button
                className="user-article__edit"
                aria-label="Edit your blog article"
              >
                <FiEdit3 />
              </button>
              <button
                onClick={() => setOpenModal(true)}
                className="user-article__delete"
                aria-label="Delete your blog article"
              >
                <FiX />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
