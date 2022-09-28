/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UserType } from '../../../components/header/Menu/AuthMenu'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiBookOpen, FiX, FiEdit3 } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { DeleteArticleModal } from '../../../components/modals/DeleteArticleModal'
import { useAuthContext } from '../../../context/AuthContext'
import { firebaseDb } from '../../../lib/firebase'
import { Buttons } from './buttons'

type ArticleProps = {
  uid: string
  text: string
  title: string
  readMin: string
  coverUrl: string
  articleId: string
}

export function Article({
  uid,
  text,
  title,
  readMin,
  coverUrl,
  articleId,
}: ArticleProps) {
  const [profile, setProfile] = useState<UserType[]>([])
  const [openModal, setOpenModal] = useState(false)
  const { user } = useAuthContext()

  const userCollectionReference = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

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
      {openModal ? (
        <DeleteArticleModal setOpenModal={setOpenModal} articleId={articleId} />
      ) : (
        ''
      )}
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
              <div key={info.profileId} className="article-wrapper__div">
                {uid === info.uid && (
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

          <Buttons articleId={articleId} />
        </div>

        {uid === user?.uid && (
          <>
            <button
              className="article__edit"
              aria-label="Edit your blog article"
            >
              <FiEdit3 />
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="article__delete"
              aria-label="Delete your blog article"
            >
              <FiX />
            </button>{' '}
          </>
        )}
      </div>
    </>
  )
}
