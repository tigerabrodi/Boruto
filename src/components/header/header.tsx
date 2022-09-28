import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

import './header.css'
import { useAuthContext } from '../../context/AuthContext'
import { useHeaderMenuContext } from '../../context/MenuContext'
import { firebaseDb } from '../../lib/firebase'
import { InfoModule } from '../modals/InfoModule'
import { DarkMode } from '../themeButton/darkMode'
import { AuthMenu } from './Menu/AuthMenu'
import { Menu } from './Menu/Menu'

type UserType = {
  avatarUrl: string
  id: string
}

export function Header() {
  const [profile, setProfile] = useState<UserType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { isMenuOpen, setIsMenuOpen } = useHeaderMenuContext()
  const { user } = useAuthContext()
  const location = useLocation()

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
      {isOpen === true && <InfoModule setIsOpen={setIsOpen} />}
      <header className="header">
        <Link onClick={() => setIsMenuOpen(false)} to="/">
          <span className="header__logo">Boruto</span>
        </Link>

        <aside className="aside">
          {user?.email ? (
            <Link
              to="/create/post"
              className="aside__write--button"
              aria-label="write a blog post"
            >
              <FaPen className="pen" /> Write
            </Link>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="aside__write--button"
              aria-label="write a blog post"
            >
              <FaPen className="pen" /> Write
            </button>
          )}

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
                  src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75"
                />
              )}
            </div>
          )}
          {isMenuOpen === true && (
            <div>{user?.uid ? <AuthMenu /> : <Menu />} </div>
          )}
        </aside>
      </header>
    </>
  )
}
