import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

import './header.css'
import { useAuthContext } from '../../context/AuthContext'
import { useHeaderMenuContext } from '../../context/MenuContext'
import { firebaseDb } from '../../lib/firebase'
import { DarkMode } from '../theme/darkMode'
import { Authenticated } from './authenticated/Authenticated'
import { NonAuthenticated } from './non-authenticated/NonAuthenticated'

type UserType = {
  avatarUrl: string
  id: string
}

export function Header() {
  const [profile, setProfile] = useState<UserType[]>([])

  const { isOpen, setIsOpen } = useHeaderMenuContext()
  const { user } = useAuthContext()
  const location = useLocation()

  const isHome =
    location.pathname === '/' ||
    location.pathname === '/create/post' ||
    location.pathname === '/profile'

  const isWiriting = location.pathname === '/create/post'

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
    <header className="header">
      <Link onClick={() => setIsOpen(false)} to="/">
        <span className="header__logo">Boruto</span>
      </Link>

      {isWiriting ? (
        <button className="header__publish--button">Publish</button>
      ) : (
        <aside className="aside">
          <Link
            to="/create/post"
            className="aside__write--button"
            aria-label="write a blog post"
          >
            <FaPen className="pen" /> Write
          </Link>

          <DarkMode />

          {isHome && (
            <div>
              {user?.uid ? (
                <div>
                  {profile.map(({ avatarUrl, id }) => {
                    return (
                      <div key={id}>
                        {user?.uid === id && (
                          <img
                            onClick={() => setIsOpen(true)}
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
                  onClick={() => setIsOpen(true)}
                  src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75"
                />
              )}
            </div>
          )}
          {isOpen === true && (
            <div>{user?.uid ? <Authenticated /> : <NonAuthenticated />} </div>
          )}
        </aside>
      )}
    </header>
  )
}
