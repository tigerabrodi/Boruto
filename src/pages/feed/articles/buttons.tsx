import './articles.css'
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi'
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from 'react-icons/md'

export function Buttons() {
  return (
    <div className="buttons">
      <button className="bookmark" aria-label="Add article to your bookmark">
        <MdOutlineBookmarkAdd />
      </button>

      <div className="buttons__wrapper">
        <button aria-label="Like article">
          <FiThumbsUp />
        </button>

        <button aria-label="Comment on article">
          <FiMessageSquare />
        </button>
      </div>
    </div>
  )
}
