import { useState } from 'react'
import { FiEdit3, FiX } from 'react-icons/fi'

import { DeleteArticleModal } from '../../../../components/modals/DeleteArticleModal'
import { useAuthContext } from '../../../../context/AuthContext'

import '../../article.css'

type EditDeleteProps = {
  uid: string
  articleId: string | undefined
}

export function EditDelete({ uid, articleId }: EditDeleteProps) {
  const [openModal, setOpenModal] = useState(false)
  const { user } = useAuthContext()
  return (
    <>
      {openModal ? (
        <DeleteArticleModal setOpenModal={setOpenModal} articleId={articleId} />
      ) : (
        ''
      )}
      {uid === user?.uid && (
        <div className="card-wrapper-button">
          <button className="article__edit" aria-label="Edit your blog article">
            <FiEdit3 />
          </button>
          <button
            onClick={() => setOpenModal(true)}
            data-cy="delete-article-button"
            className="article__delete"
            aria-label="Delete your blog article"
          >
            <FiX />
          </button>
        </div>
      )}
    </>
  )
}
