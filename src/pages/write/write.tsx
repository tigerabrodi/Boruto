/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './write.css'
import {
  updateDoc,
  doc,
  serverTimestamp,
  addDoc,
  collection,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FiX } from 'react-icons/fi'
import { IoImageOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../context/AuthContext'
import { firebaseDb, firebaseStorage } from '../../lib/firebase'
import { useLoadingStore } from '../../lib/store'
import { Preview } from './preview'

export function Write() {
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [textField, setTextField] = useState('')
  const [titleField, setTitleField] = useState('')
  const [minuteField, setMinuteField] = useState('')

  const filePickerRef = useRef<any>(null)

  const { setStatus } = useLoadingStore()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const createBlogArticle = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setStatus('loading')

    const documentReference = await addDoc(collection(firebaseDb, 'articles'), {
      timestamp: serverTimestamp(),
      id: user?.uid,
    })

    const imageReference = ref(
      firebaseStorage,
      `articles/${documentReference.id}/image`
    )

    await uploadString(imageReference, selectedFile, 'data_url').then(
      async () => {
        const downloadURL = await getDownloadURL(imageReference)

        await updateDoc(doc(firebaseDb, `articles/${documentReference.id}`), {
          title: titleField,
          text: textField,
          coverUrl: downloadURL,
          readMin: minuteField,
        })
      }
    )

    setStatus('success')
    setSelectedFile(null)
    navigate('/')
    toast.success('You successfully created a blog article.')
  }

  const addImageToPost = (e: any) => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result)
    }
  }

  return (
    <div className="create-article">
      <div className="write">
        <div className="write__header">
          <div
            className="write__header--container"
            onClick={() => filePickerRef.current.click()}
          >
            <button
              role="file input"
              className="write__header--button"
              aria-label="Add a cover to your blog article"
            >
              <IoImageOutline className="icon" /> Add Cover
            </button>

            <input
              id="fileInput"
              className="cover__file--btn"
              type="file"
              name="file"
              ref={filePickerRef}
              onChange={addImageToPost}
              hidden
            />
          </div>
          <div className="write__header--wrapper">
            <label htmlFor="Read minute">Read minute</label>
            <input
              type="number"
              name="ReadMIn"
              id="Read minute"
              placeholder="0"
              onChange={(event) => setMinuteField(event?.target.value)}
            />
            <span>min read</span>
          </div>
        </div>

        {selectedFile ? (
          <div
            className="write__cover"
            style={{
              backgroundImage: `url(${selectedFile})`,
            }}
          >
            <button
              aria-label="Remove cover"
              onClick={() => setSelectedFile(null)}
            >
              <FiX />
            </button>
          </div>
        ) : (
          ''
        )}

        <div className="write__wrapper">
          <label htmlFor="Article title">Article Title</label>
          <textarea
            name="title"
            id="Article title"
            placeholder="Article title..."
            onChange={(event) => setTitleField(event.target.value)}
          />
        </div>

        <div className="line"></div>

        <div className="write__container">
          <label htmlFor="Article text">Article text</label>
          <textarea
            name="text"
            id="Article text"
            placeholder="Tell your story..."
            onChange={(event) => setTextField(event.target.value)}
          />
          <div className="line"></div>
          {textField === '' ? (
            <div className="write__container--empty">
              Nothing to preview! 🌵
            </div>
          ) : (
            <Preview textField={textField} />
          )}
        </div>
      </div>

      <div className="create-article__buttons">
        <button
          onClick={createBlogArticle}
          disabled={titleField === '' || textField === '' || minuteField === ''}
        >
          Publish
        </button>
        <button>cancel</button>
      </div>
    </div>
  )
}
