import { InfoModule } from '../../../components/modals/InfoModule'
// eslint-disable-next-line import/order
import { useAuthContext } from '../../../context/AuthContext'

import '../comments/comments.css'
import { useInfoModuleContext } from '../../../context/InfoModuleContext'
import CommentsLength from '../comments/commentLength'
import { Textarea } from './textarea'

export type CommentType = {
  id: string
  comment: string
  commentUid: string | undefined
  timestamp: { seconds: number; nanoseconds: number }
}

type ContainerProps = {
  articleId: string | undefined
}

export function Container({ articleId }: ContainerProps) {
  const { user } = useAuthContext()
  const { isOpen, setIsOpen } = useInfoModuleContext()

  return (
    <>
      {isOpen === true && <InfoModule />}
      <div id="comment-container">
        {user?.email ? (
          <Textarea articleId={articleId} />
        ) : (
          <div className="comment-container__wrapper">
            <CommentsLength articleId={articleId} />
            <button
              onClick={() => setIsOpen(true)}
              className="container__button"
              aria-label="Sign in to write a comment "
            >
              Write a comment
            </button>
          </div>
        )}
      </div>
    </>
  )
}
