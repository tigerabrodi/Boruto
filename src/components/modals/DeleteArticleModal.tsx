import { deleteDoc, doc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { firebaseDb } from '../../lib/firebase'
import { useLoadingStore } from '../../lib/store'
import './modals.css'

type DeleteArticleModalProps = {
  articleId: string | undefined
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteArticleModal({
  setOpenModal,
  articleId,
}: DeleteArticleModalProps) {
  const navigate = useNavigate()

  const { setStatus } = useLoadingStore()

  const deleteArticle = async () => {
    setStatus('loading')
    const postDoc = doc(firebaseDb, `articles/${articleId}`)
    await deleteDoc(postDoc)
    setStatus('success')
    toast.success('Successfully deleted your blog article.')
    setOpenModal(false)
    navigate('/my-profile')
  }
  return (
    <div
      data-cy="overlay"
      className="overlay"
      onClick={() => setOpenModal(false)}
    >
      <div data-cy="delete-article-modal" className="modal modal__delete">
        <h1
          data-cy="delete-article-modal-title"
          className="modal__delete--title"
        >
          Are you sure?
        </h1>
        <p data-cy="delete-article-modal-text" className="modal__delete--text">
          Do you really want to delete your article?
        </p>
        <div className="modal__delete--buttons">
          <button data-cy="delete-article-modal-button" onClick={deleteArticle}>
            Yes
          </button>{' '}
          <button onClick={() => setOpenModal(false)}>No</button>
        </div>
      </div>
    </div>
  )
}
