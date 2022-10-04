import { MdOutlineBookmarkAdd } from 'react-icons/md'

import { CommentButton } from './commentButton'
import { LikeButton } from './likeButton'

export type ButtonsProps = {
  articleId: string | undefined
}

export function Buttons({ articleId }: ButtonsProps) {
  return (
    <div className="container__buttons">
      <div className="container__buttons--wrapper">
        <LikeButton articleId={articleId} />
        <CommentButton articleId={articleId} />
        <button>
          <MdOutlineBookmarkAdd />
        </button>
      </div>
    </div>
  )
}
