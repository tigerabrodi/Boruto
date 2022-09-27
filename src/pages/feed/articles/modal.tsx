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
      <div className="modal">
        <h1>Are you sure?</h1>
        <p>Do you really want to delete your article?</p>
        <div className="modal__buttons">
          <button onClick={deleteArticle}>Yes</button>{' '}
          <button onClick={() => setOpenModal(false)}>No</button>
        </div>
      </div>
    </div>
  )
}
