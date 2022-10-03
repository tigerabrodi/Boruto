import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiBookOpen } from 'react-icons/fi'

import { firebaseDb } from '../../../lib/firebase'

type AuthorProps = {
  id: string
  readMin: number
}

type AuthorType = {
  username: string
  uid: string
}

export function Author({ readMin, id }: AuthorProps) {
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
      {author.map(({ username, uid }) => {
        return (
          <div key={uid}>
            {id === uid && (
              <div className="user__article--author">
                <p>@{username}</p>
                <p>
                  <FiBookOpen className="icon" />
                  {readMin} read min
                </p>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
