import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { firebaseDb } from '../../../lib/firebase'

type UserType = {
  profileId: string
  avatarUrl: string
  fullname: string
  uid: string
}
type AuthorProps = {
  dataID: string
}

export function Author({ dataID }: AuthorProps) {
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
    <>
      {profile.map(({ avatarUrl, fullname, uid, profileId }) => {
        return (
          <div className="card__wrapper--author" key={profileId}>
            {uid === dataID && (
              <>
                <img src={avatarUrl} alt={`fullname avatar`} />

                <Link to={`/profile/${profileId}`}>{fullname}</Link>
              </>
            )}
          </div>
        )
      })}
    </>
  )
}
