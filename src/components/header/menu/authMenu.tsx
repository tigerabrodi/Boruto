import './menu.css'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiUser, FiLogOut, FiBookmark } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../../context/AuthContext'
import { useHeaderMenuContext } from '../../../context/MenuContext'
import { firebaseAuth, firebaseDb } from '../../../lib/firebase'
import { useLoadingStore } from '../../../lib/store'

export type UserType = {
  fullname: string
  bio: string
  location: string
  avatarUrl: string
  username: string
  uid: string
  profileId: string
}

export function AuthMenu() {
  const { setIsMenuOpen } = useHeaderMenuContext()

  const [profile, setProfile] = useState<UserType[]>([])
  const { setStatus } = useLoadingStore()
  const navigate = useNavigate()

  const { user } = useAuthContext()

  const userCollectionReference = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

  const handleSignOut = async () => {
    setIsMenuOpen(false)
    setStatus('loading')
    firebaseAuth.signOut()
    navigate('/')
    toast.success('Successfully signed out of your account.')
    setStatus('success')
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
    <>
      {profile.map(({ username, avatarUrl, fullname, profileId }) => {
        return (
          <div key={profileId} className="auth-menu">
            {user?.uid === profileId && (
              <>
                <div className="auth-menu__wrapper">
                  <img src={avatarUrl} alt="profile" />
                  <div className="auth-menu__wrapper--info">
                    <p>{fullname}</p>
                    <p>@{username}</p>
                  </div>
                </div>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  to="/my-profile"
                  className="auth-menu__profile--button"
                  data-cy="my-profile-link"
                >
                  <FiUser className="icon" /> My Profile
                </Link>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  to="/bookmarks"
                  className="auth-menu__bookmarks--button"
                >
                  <FiBookmark className="icon" />
                  My Bookmarks
                </Link>
                <button
                  onClick={handleSignOut}
                  className="auth-menu__logout--button"
                >
                  <FiLogOut className="icon" /> Log out
                </button>{' '}
              </>
            )}
          </div>
        )
      })}
    </>
  )
}
