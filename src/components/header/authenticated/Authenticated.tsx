import './authenticated.css'
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
  id: string
}

export function Authenticated() {
  const { setIsOpen } = useHeaderMenuContext()

  const [profile, setProfile] = useState<UserType[]>([])
  const { setStatus } = useLoadingStore()
  const navigate = useNavigate()

  const { user } = useAuthContext()

  const userCollectionReference = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

  const handleSignOut = async () => {
    setIsOpen(false)
    setStatus('loading')
    firebaseAuth.signOut()
    navigate('/')
    toast.success('Successfully signed out of your account.')
    setStatus('success')
  }

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
      {profile.map(({ username, avatarUrl, fullname, id }) => {
        return (
          <div key={id} className="authenticated">
            {user?.uid === id && (
              <>
                <div className="authenticated__wrapper">
                  <img src={avatarUrl} alt="profile" />
                  <div className="authenticated__wrapper--info">
                    <p>{fullname}</p>
                    <p>@{username}</p>
                  </div>
                </div>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/profile"
                  className="authenticated__profile--button"
                >
                  <FiUser className="icon" /> My Profile
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/bookmarks"
                  className="authenticated__bookmarks--button"
                >
                  <FiBookmark className="icon" />
                  My Bookmarks
                </Link>
                <button
                  onClick={handleSignOut}
                  className="authenticated__logout--button"
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
