/* eslint-disable @typescript-eslint/no-explicit-any */
import '../signup/signup'
import './createprofile.css'
import { updateDoc, doc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { IoCameraOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import { useFormState } from '../../hooks/useFormState'
import { firebaseDb, firebaseAuth, firebaseStorage } from '../../lib/firebase'

export function CreateProfile() {
  const filePickerRef = useRef<any>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const [isNameError, setIsNameError] = useState(false)
  const [isLocationError, setIsLocationError] = useState(false)
  const [isAgeError, setIsAgeError] = useState(false)
  const [isBioError, setIsBioError] = useState(false)

  const navigate = useNavigate()

  const {
    handleChange,
    formState: { name, age, bio, location },
  } = useFormState({
    name: '',
    age: '',
    bio: '',
    location: '',
  })

  const isAnyFieldEmpty =
    !name.length || !age.length || !bio.length || !location.length

  const canUserSignUp = () => {
    const isNameValueEmpty = name.length <= 0
    if (isNameValueEmpty) {
      setIsNameError(true)
      return setTimeout(() => {
        setIsNameError(false)
      }, 3000)
    }

    const isAgeEmpty = name.length <= 0
    if (isAgeEmpty) {
      setIsAgeError(true)
      return setTimeout(() => {
        setIsAgeError(false)
      }, 3000)
    }

    const isLocationEmpty = name.length <= 0
    if (isLocationEmpty) {
      setIsLocationError(true)
      return setTimeout(() => {
        setIsLocationError(false)
      }, 3000)
    }

    const isBioEmpty = name.length <= 0
    if (isBioEmpty) {
      setIsBioError(true)
      return setTimeout(() => {
        setIsBioError(false)
      }, 3000)
    }
    return true
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    if (canUserSignUp() === true) {
      if (loading) return setLoading(true)

      const imageReference = ref(
        firebaseStorage,
        `avatars/${firebaseAuth.currentUser?.uid}/image`
      )

      await uploadString(imageReference, selectedFile, 'data_url').then(
        async () => {
          const downloadURL = await getDownloadURL(imageReference)

          await updateDoc(
            doc(firebaseDb, `users/${firebaseAuth.currentUser?.uid}`),
            {
              age: age,
              bio: bio,
              location: location,
              fullname: name,
              avatarUrl: downloadURL,
            }
          )
        }
      )

      setLoading(false)
      setSelectedFile(null)
      navigate('/')
      toast.success('You successfully created your account.')
    }
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
      <div className="form" onSubmit={handleSubmit}>
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

        <div className="form__wrapper flex">
          <div className="form__wrapper--aside">
            <label htmlFor="Full Name">Full Name *</label>
            <input
              type="text"
              name="name"
              id="Full Name"
              onChange={handleChange}
              value={name}
              aria-invalid={isNameError ? 'true' : 'false'}
            />
            {isNameError && (
              <p className="alert danger" role="alert">
                Please enter your full name
              </p>
            )}
          </div>
          <div className="form__wrapper--aside ">
            <label htmlFor="Age">Age *</label>

            <input
              type="number"
              name="age"
              id="Age"
              onChange={handleChange}
              value={age}
              aria-invalid={isAgeError ? 'true' : 'false'}
            />
            {isAgeError && (
              <p className="alert danger" role="alert">
                Please enter your age
              </p>
            )}
          </div>
        </div>

        <div className="form__wrapper">
          <label htmlFor="location">Location *</label>

          <input
            type="text"
            name="location"
            id="location"
            onChange={handleChange}
            value={location}
            aria-invalid={isLocationError ? 'true' : 'false'}
          />
          {isLocationError && (
            <p className="alert danger" role="alert">
              please enter your location
            </p>
          )}
        </div>

        <div className="form__wrapper">
          <label htmlFor="Biography">Tell us about what you do *</label>

          <textarea
            name="bio"
            id="Biography"
            onChange={handleChange}
            value={bio}
            aria-invalid={isBioError ? 'true' : 'false'}
          />
          {isBioError && (
            <p className="alert danger" role="alert">
              please enter about yourself
            </p>
          )}
        </div>
        <button
          type="submit"
          className="form__button"
          disabled={isAnyFieldEmpty || selectedFile == null}
          onClick={handleSubmit}
        >
          {loading ? 'Done...' : 'Done'}
        </button>
      </div>
    </div>
  )
}
