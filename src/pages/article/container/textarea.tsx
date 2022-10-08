import type { CollectionReference } from 'firebase/firestore'

import { doc, setDoc } from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'

import { useAuthContext } from '../../../context/AuthContext'
import { firebaseDb } from '../../../lib/firebase'
// eslint-disable-next-line import/order
import { useLoadingStore } from '../../../lib/store'

import '../comments/comments.css'

type UserType = {
  profileId: string
  avatarUrl: string
  fullname: string
  bio: string
  uid: string
}

type TextAreaProps = {
  articleId: string | undefined
}

export function Textarea({ articleId }: TextAreaProps) {
  const uuid = v4()
  const { setStatus } = useLoadingStore()
  const { user } = useAuthContext()
  const [commentField, setCommentField] = useState('')
  const [profile, setProfile] = useState<UserType[]>([])

  const userCollectionReference = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

  const sendComment = async () => {
    setStatus('loading')

    const commentsCollectionReference = doc(
      firebaseDb,
      `articles/${articleId}/comments/${uuid} `
    )

    setCommentField('')
    await setDoc(commentsCollectionReference, {
      comment: commentField,
      timestamp: serverTimestamp(),
      commentUid: user?.uid,
    })
    setStatus('success')
    toast.success('You successfully added a comment to this article')
  }

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

  return (
    <div className="write-comment">
      {profile.map(({ uid, fullname, bio, avatarUrl, profileId }) => {
        return (
          <div className="comment__author--wrapper" key={profileId}>
            {uid === user?.uid && (
              <div className="write-comment__author">
                <img src={avatarUrl} alt="" />
                <span>
                  <Link to={`/profile/${profileId}`}>{fullname}</Link>
                  <p>{bio.substr(0, 80) + '...'}</p>
                </span>
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
          data-cy="comment-teaxtarea"
          placeholder="Write your comment here..."
          onChange={(event) => setCommentField(event.target.value)}
        />
      </div>

      <div className="write-comment__buttons">
        <button onClick={sendComment} data-cy="post-comment-button">
          Post
        </button>
      </div>
    </div>
  )
}
