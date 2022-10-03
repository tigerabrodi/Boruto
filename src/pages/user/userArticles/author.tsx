import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiBookOpen } from 'react-icons/fi'

import { useAuthContext } from '../../../context/AuthContext'
import { firebaseDb } from '../../../lib/firebase'

type AuthorProps = {
  readMin: number
}

type AuthorType = {
  fullname: string
  uid: string
}

export function Author({ readMin }: AuthorProps) {
  const { user } = useAuthContext()
  const [author, setAuthor] = useState<AuthorType[]>([])

  const userCollection = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<AuthorType>

  useEffect(() => {
    const getAuthor = onSnapshot(userCollection, (snapshot) => {
      setAuthor(snapshot.docs.map((doc) => ({ ...doc.data() })))
    })
    return () => {
      getAuthor()
    }
  }, [])

  return (
    <>
      {author.map(({ fullname, uid }, id) => {
        return (
          <div className="user__article--author" key={id}>
            {uid === user?.uid && (
              <>
                {' '}
                <p>{fullname}</p>
                <p>
                  <FiBookOpen className="icon" />
                  {readMin} read min
                </p>
              </>
            )}
          </div>
        )
      })}
    </>
  )
}
