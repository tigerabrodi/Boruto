/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UserType } from '../../../components/header/menu/authMenu'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiBookOpen, FiX, FiEdit3 } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { DeleteArticleModal } from '../../../components/modals/DeleteArticleModal'
import { useAuthContext } from '../../../context/AuthContext'
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
            <Link to={`/article/${articleId}`}>{title}</Link>

            <Link to={`/article/${articleId}`}>
              <ReactMarkdown
                className="container__info--text"
                children={text && text.substr(0, 185) + '...'}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={dracula}
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              />
            </Link>
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
                        <Link to={`/profile/${info.profileId}`}>
                          {info.fullname}
                        </Link>
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
