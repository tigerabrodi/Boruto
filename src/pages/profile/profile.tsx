import type { UserType } from '../../components/header/Menu/AuthMenu'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import './profile.css'
import { useAuthContext } from '../../context/AuthContext'
import { firebaseDb } from '../../lib/firebase'
export function Profile() {
  const [profile, setProfile] = useState<UserType[]>([])

  const { user } = useAuthContext()

  const userCollectionReference = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

  useEffect(() => {
    const getProfile = () => {
      onSnapshot(userCollectionReference, (snapshot) => {
        setProfile(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    }
    getProfile()
  }, [])

  return (
    <>
      {profile.map(({ fullname, username, avatarUrl, bio, location, uid }) => {
        return (
          <div className="profile" key={uid}>
            {user?.uid === uid && (
              <div className="card">
                <div className="card__wrapper">
                  <div className="card__wrapper--primary">
                    <img src={avatarUrl} alt="profile" />
                    <p>@{username}</p>
                  </div>
                  <div className="card__wrapper--secondary">
                    <p>{fullname}</p>
                    <p>{location}</p>
                    <p>{bio}</p>
                  </div>
                </div>

                <Link to="/edit/profile" aria-label="Edit profile">
                  <FiEdit3 className="pen" />
                  Edit
                </Link>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
