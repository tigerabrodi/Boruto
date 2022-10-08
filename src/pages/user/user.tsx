/* eslint-disable import/order */
import type { UserType } from '../../components/header/menu/authMenu'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'

import '../../styles/user-profile.css'
import { Link } from 'react-router-dom'

import { useAuthContext } from '../../context/AuthContext'
import { firebaseDb } from '../../lib/firebase'
import { UserArticles } from './userArticles/userArticles'

export function User() {
  const [userInfo, setUserInfo] = useState<UserType[]>([])

  const { user } = useAuthContext()

  const userCollectionReference = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

  useEffect(() => {
    const getUser = () => {
      onSnapshot(userCollectionReference, (snapshot) => {
        setUserInfo(
          snapshot.docs.map((doc) => ({ ...doc.data(), profileId: doc.id }))
        )
      })
    }
    getUser()
  }, [])

  return (
    <div className="user-profile">
      {userInfo.map(({ fullname, username, avatarUrl, bio, location, uid }) => {
        return (
          <div key={uid}>
            {user?.uid === uid && (
              <div className="user">
                <div className="user__wrapper">
                  <div className="user__wrapper--primary">
                    <img src={avatarUrl} alt="user" />
                    <p>@{username}</p>
                  </div>
                  <div className="user__wrapper--secondary">
                    <p>{fullname}</p>
                    <p>{location}</p>
                    <p>{bio}</p>
                  </div>
                </div>

                <Link
                  className="edit-button"
                  to="/edit/my-profile"
                  aria-label="Edit your profile"
                >
                  <FiEdit3 className="pen" />
                  Edit
                </Link>
              </div>
            )}
          </div>
        )
      })}

      <UserArticles />
    </div>
  )
}
