import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi'
import { MdOutlineBookmarkAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

type ButtonsProps = {
  title: string
  articleId: string
}

export function Buttons({ articleId, title }: ButtonsProps) {
  return (
    <div className="buttons">
      <Link
        to={`/article/${articleId}`}
        className="bookmark"
        aria-label={`Go to article "${title}"  `}
      >
        <MdOutlineBookmarkAdd />
      </Link>

      <Link
        to={`/article/${articleId}`}
        aria-label={`Go to article "${title}"  `}
      >
        <FiMessageSquare />
      </Link>
      <Link
        to={`/article/${articleId}`}
        aria-label={`Go to article "${title}"  `}
        className="button__like"
        // onClick={likePost}
      >
        <FiThumbsUp />
      </Link>
    </div>
  )
}
