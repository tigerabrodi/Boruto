/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UserType } from '../../../components/header/authenticated/Authenticated'
import type { ArticleType } from './articles'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiBookOpen, FiX, FiEdit3 } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { useAuthContext } from '../../../context/AuthContext'
import { firebaseDb } from '../../../lib/firebase'
import { Buttons } from './buttons'

type ArticleProps = {
  article: ArticleType
}

export function Article({ id, text, title, readMin, coverUrl }: ArticleProps) {
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
    <div className="article">
      <div
        className="article__cover"
        style={{
          backgroundImage: `url(${coverUrl})`,
        }}
      />
      <div className="article__container">
        <div className="container__info">
          <h1>{title}</h1>
          <ReactMarkdown
            className="container__info--text"
            children={text && text.substr(0, 200) + '...'}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
        </div>
      </div>
      <div className="article-wrapper">
        {profile.map((info) => {
          return (
            <div className="article-wrapper__div">
              {id === info.id && (
                <>
                  <div className="article-wrapper__div--info">
                    <img src={info.avatarUrl} alt="profile" />{' '}
                    <div className="article-wrapper__div--info--wrap">
                      <p>{info.fullname}</p>
                      <p>
                        <FiBookOpen className="icon" />
                        {readMin} read min
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}

        <Buttons />
      </div>

      {id === user?.uid && (
        <>
          <button className="article__edit" aria-label="Edit your blog article">
            <FiEdit3 />
          </button>
          <button
            className="article__delete"
            aria-label="Delete your blog article"
          >
            <FiX />
          </button>{' '}
        </>
      )}
    </div>
  )
}
