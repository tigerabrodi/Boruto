import type { UserType } from '../../../components/header/menu/authMenu'
import type { CommentType } from './container'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { firebaseDb } from '../../../lib/firebase'

export function Comment({ comment, commentUid }: CommentType) {
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
  return (
    <div className="comment">
      {profile.map(({ profileId, avatarUrl, fullname, bio, uid }) => {
        return (
          <div key={profileId}>
            {uid === commentUid && (
              <div className="comment__author">
                <img src={avatarUrl} alt="" />
                <span>
                  <Link to={`/profile/${profileId}`}>{fullname}</Link>
                  <p>{bio.substr(0, 60) + '...'}</p>{' '}
                </span>
              </div>
            )}
          </div>
        )
      })}

      <p>{comment}</p>
    </div>
  )
}
