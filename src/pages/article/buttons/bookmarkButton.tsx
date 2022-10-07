import { BsBookmark } from 'react-icons/bs'

type BookmarkButtonProps = {
  articleId: string | undefined
}

export function BookmarkButton({ articleId }: BookmarkButtonProps) {
  return (
    <button>
      <BsBookmark className="bookmark" />
    </button>
  )
}
