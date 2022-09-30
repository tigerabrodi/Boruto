import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useAuthContext } from '../../../context/AuthContext'
import { useHeaderMenuContext } from '../../../context/MenuContext'
import { firebaseDb } from '../../../lib/firebase'

import '../header.css'

type UserType = {
  avatarUrl: string
  id: string
}

export function Avatar() {
  const [profile, setProfile] = useState<UserType[]>([])

  const { setIsMenuOpen } = useHeaderMenuContext()
  const { user } = useAuthContext()

  const location = useLocation()

  const defaultAvatar =
    'https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75'

  const isHome =
    location.pathname === '/' ||
    location.pathname === '/create/post' ||
    location.pathname === '/profile'

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
      {isHome && (
        <div>
          {user?.uid ? (
            <div>
              {profile.map(({ avatarUrl, id }) => {
                return (
                  <div key={id}>
                    {user?.uid === id && (
                      <img
                        onClick={() => setIsMenuOpen(true)}
                        src={avatarUrl}
                        alt="profile"
                        className="aside__profile"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <img
              alt="no profile"
              className="aside__profile"
              onClick={() => setIsMenuOpen(true)}
              src={defaultAvatar}
            />
          )}
        </div>
      )}
    </>
  )
}
