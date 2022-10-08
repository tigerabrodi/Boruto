/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UserType } from '../../../components/header/menu/authMenu'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiBookOpen } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { firebaseDb } from '../../../lib/firebase'
import { Buttons } from './buttons/buttons'

type ArticleProps = {
  uid: string
  text: string
  title: string
  readMin: string
  coverUrl: string
  articleId: string
}

export function BlogArticle({
  uid,
  text,
  title,

  readMin,
  coverUrl,
  articleId,
}: ArticleProps) {
  const [profile, setProfile] = useState<UserType[]>([])

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
    <div className="article">
      <Link to={`/article/${articleId}`}>
        <div
          className="article__cover"
          style={{
            backgroundImage: `url(${coverUrl})`,
          }}
        />
      </Link>
      <div className="article__container">
        <div className="container__info">
          <Link to={`/article/${articleId}`} data-cy="article-link">
            {title}
          </Link>

          <Link to={`/article/${articleId}`}>
            <ReactMarkdown
              className="container__info--text"
              children={text && text.substr(0, 185) + '...'}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            />
          </Link>
        </div>
      </div>
      <div className="article-wrapper">
        {profile.map((info) => {
          return (
            <div key={info.profileId} className="article-wrapper__div">
              {uid === info.uid && (
                <div className="article-wrapper__div--info">
                  <img src={info.avatarUrl} alt="profile" />{' '}
                  <div className="article-wrapper__div--info--wrap">
                    <Link to={`/profile/${info.profileId}`}>
                      {info.fullname}
                    </Link>
                    <p>
                      <FiBookOpen className="icon" />
                      {readMin} read min
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        <Buttons articleId={articleId} title={title} />
      </div>
    </div>
  )
}
