import { deleteDoc, doc } from 'firebase/firestore'
import toast from 'react-hot-toast'

import { firebaseDb } from '../../../lib/firebase'
import { useLoadingStore } from '../../../lib/store'
import './articles.css'
type ModalProps = {
  articleId: string
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function Modal({ setOpenModal, articleId }: ModalProps) {
  const { setStatus } = useLoadingStore()

  const deleteArticle = async () => {
    setStatus('loading')

    const postDoc = doc(firebaseDb, `articles/${articleId}`)
    await deleteDoc(postDoc)

    setStatus('success')
    toast.success('Successfully deleted your blog article.')
  }
  return (
    <div className="overlay">
      <div className="modal modal__delete">
        <h1 className="modal__delete--title">Are you sure?</h1>
        <p className="modal__delete--text">
          Do you really want to delete your article?
        </p>
        <div className="modal__delete--buttons">
          <button onClick={deleteArticle}>Yes</button>{' '}
          <button onClick={() => setOpenModal(false)}>No</button>
        </div>
      </div>
    </div>
  )
}
