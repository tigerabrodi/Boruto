import type { CollectionReference } from 'firebase/firestore'

import { serverTimestamp } from 'firebase/firestore'
import { addDoc } from 'firebase/firestore'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useAuthContext } from '../../../context/AuthContext'
import { firebaseDb } from '../../../lib/firebase'
import { useLoadingStore } from '../../../lib/store'

import './comments.css'

type UserType = {
  profileId: string
  avatarUrl: string
  fullname: string
  bio: string

  uid: string
}

export type CommentType = {
  comment: string
  article: string
  timestamp: { seconds: number; nanoseconds: number }
  commentUid: string | undefined
}

type ContainerProps = {
  articleId: string | undefined
}
export function Container({ articleId }: ContainerProps) {
  const { setStatus } = useLoadingStore()
  const { user } = useAuthContext()
  const [commentField, setCommentField] = useState('')

  const [profile, setProfile] = useState<UserType[]>([])

  const userCollectionReference = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

  useEffect(() => {
    const getProfile = () => {
      onSnapshot(userCollectionReference, (snapshot) => {
        setProfile(
          snapshot.docs.map((doc) => ({ ...doc.data(), profileId: doc.id }))
        )
      })
    }
    getProfile()
  }, [])

  const sendComment = async () => {
    setStatus('loading')

    const commentsCollectionReference = collection(
      firebaseDb,
      `comments `
    ) as CollectionReference<CommentType>

    setCommentField('')
    await addDoc(commentsCollectionReference, {
      comment: commentField,
      article: articleId,
      timestamp: serverTimestamp(),
      commentUid: user?.uid,
    })
    setStatus('success')
    toast.success('You successfully added a comment to this article')
  }

  return (
    <div id="comment-container">
      {user?.email ? (
        <div className="write-comment">
          {profile.map(({ uid, fullname, bio, avatarUrl, profileId }) => {
            return (
              <div key={profileId}>
                {uid === user?.uid && (
                  <div className="write-comment__author">
                    <img src={avatarUrl} alt="user avatar" />
                    <div className="write-comment__author--wrapper">
                      <p>{fullname}</p> <p>{bio.substr(0, 60) + '...'}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          <div className="write-comment__field">
            <label htmlFor="Write a comment"></label>
            <textarea
              name="Write a comment"
              id="Write a comment"
              placeholder="Write your comment here..."
              onChange={(event) => setCommentField(event.target.value)}
            />
          </div>

          <div className="write-comment__buttons">
            <button onClick={sendComment}>Post</button>
          </div>
        </div>
      ) : (
        <div className="comment-container__wrapper">
          <p>Comments(3)</p>
          <button
            className="container__button"
            aria-label="Sign in to write a comment "
          >
            Write a comment
          </button>
        </div>
      )}
    </div>
  )
}
