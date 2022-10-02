import type { UserType } from '../../components/header/menu/authMenu'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import './user.css'
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
        setUserInfo(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    }
    getUser()
  }, [])

  return (
    <div className="user">
      {userInfo.map(({ fullname, username, avatarUrl, bio, location, uid }) => {
        return (
          <div key={uid}>
            {user?.uid === uid && (
              <div className="card">
                <div className="card__wrapper">
                  <div className="card__wrapper--primary">
                    <img src={avatarUrl} alt="user" />
                    <p>@{username}</p>
                  </div>
                  <div className="card__wrapper--secondary">
                    <p>{fullname}</p>
                    <p>{location}</p>
                    <p>{bio}</p>
                  </div>
                </div>

                <Link to="/edit/user" aria-label="Edit user">
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
