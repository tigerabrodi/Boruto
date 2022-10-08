/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DocumentData } from 'firebase/firestore'

import { FirebaseError } from 'firebase/app'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiBookOpen } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { firebaseDb } from '../../lib/firebase'
import './article.css'
import { Author } from './author/author'
import { Buttons } from './buttons'
import { EditDelete } from './buttons/editDelete/editDelete'
import { Comments } from './comments/comments'
import { Container } from './container/container'

export type ParamsType = {
  id: string | undefined
}

export function Article() {
  const { id } = useParams<ParamsType>()
  const [data, setData] = useState<DocumentData>()

  useEffect(() => {
    const getDocument = async () => {
      try {
        const articlesCollectionReference = doc(firebaseDb, `articles/${id}`)
        const docSnap = await getDoc(articlesCollectionReference)

        if (docSnap.exists()) {
          setData(docSnap.data())
          console.log(data)
        } else {
          setData(undefined)
          console.log('No document!')
        }
      } catch (error) {
        if (error instanceof FirebaseError) console.log(error)
      }
    }
    return () => {
      getDocument()
    }
  }, [])

  return (
    <section className="container">
      {data && (
        <>
          <div>
            <div className="card">
              <div className="card-wrapper">
                <EditDelete uid={data.uid} articleId={id} />
                <img src={data.coverUrl} alt="" className="card__cover" />
              </div>
              <h1 className="card__title">{data.title}</h1>
              <h1 className="card__subtitle">{data.subtitle}</h1>
              <div className="card__wrapper">
                <Author dataID={data.uid} />
                <p>
                  <FiBookOpen />
                  {data.readMin} read min
                </p>
              </div>
              <ReactMarkdown
                children={data.text}
                className="card__text"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        className="SyntaxHighlighter"
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
            </div>
            <Container articleId={id} />
            <Comments articleId={id} />
          </div>

          <Buttons articleId={id} />
        </>
      )}
    </section>
  )
}
