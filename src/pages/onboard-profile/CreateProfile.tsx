import '../signup/signup'
import './createprofile.css'
import { IoCameraOutline } from 'react-icons/io5'
import { useRef, useState } from 'react'
import { firebaseDb, firebaseAuth, firebaseStorage } from '../../lib/firebase'
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

export function CreateProfile() {
  const filePickerRef = useRef<any>(null)

  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [biography, setBiography] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const createAccount = async () => {
    if (loading) return
    setLoading(true)

    if (selectedFile === null) {
      setError('Please select a profile picture')
    } else if (username === '') {
      setError('Please enter a username')
    } else if (fullName === '') {
      setError('Please enter your full name')
    } else {
      const documentReference = await addDoc(collection(firebaseDb, 'users'), {
        name: fullName,
        username: username,
        biography: biography,
        userId: firebaseAuth.currentUser?.uid,
        timestamp: serverTimestamp(),
      })

      const imageReference = ref(
        firebaseStorage,
        `users/${documentReference.id}/image`
      )

      await uploadString(imageReference, selectedFile, 'data_url').then(
        async () => {
          const downloadURL = await getDownloadURL(imageReference)

          await updateDoc(doc(firebaseDb, `users/${documentReference.id}`), {
            image: downloadURL,
          })
          setError(' ')
        }
      )
    }
    setLoading(false)
    setSelectedFile(null)
    navigate('/')
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
    <div className="signup">
      <div className="form">
        {error && <p>{error}</p>}
        <h2>Create your account</h2>

        {selectedFile ? (
          <div
            className="form__image--profile"
            onClick={() => setSelectedFile(null)}
          >
            <img src={selectedFile} />
          </div>
        ) : (
          <div
            className="form__image"
            onClick={() => filePickerRef.current.click()}
          >
            <label htmlFor="fileInput">
              <IoCameraOutline
                className="form__image--svg"
                aria-label="select an image"
              />
            </label>

            <input
              id="fileInput"
              className="modal__file--btn"
              type="file"
              name="file"
              ref={filePickerRef}
              onChange={addImageToPost}
              hidden
            />
          </div>
        )}

        <div className="form__wrapper">
          <label htmlFor="Full Name">Full Name</label>
          <input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            name="Full Name"
            id="Full Name"
          />
        </div>

        <div className="form__wrapper ">
          <label htmlFor="Username">Pick a username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            name="text"
            id="Username"
          />
        </div>

        <div className="form__wrapper">
          <label htmlFor="Biography">Tell us about what you do:</label>
          <textarea
            onChange={(e) => setBiography(e.target.value)}
            name="text"
            id="Biography"
          />
        </div>
        <button
          onClick={createAccount}
          type="submit"
          className="form__button"
          disabled={loading}
        >
          {loading === true ? 'Next...' : 'Next'}
        </button>
      </div>
    </div>
  )
}
