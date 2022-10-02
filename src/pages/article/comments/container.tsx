import { useAuthContext } from '../../../context/AuthContext'

import './comments.css'

export function Container() {
  const { user } = useAuthContext()

  return (
    <div id="comment-container">
      {user?.email ? (
        <div className="write-comment">
          <div className="write-comment__author">
            <img
              src="https://i.pinimg.com/originals/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg"
              alt="user avatar"
            />
            <div className="write-comment__author--wrapper">
              <p>Full name</p> <p>@username</p>
            </div>
          </div>

          <div className="write-comment__field">
            <label htmlFor="Write a comment"></label>
            <textarea
              name="Write a comment"
              id="Write a comment"
              placeholder="Write your comment here..."
            />
          </div>

          <div className="write-comment__buttons">
            <button>Post</button>
          </div>
        </div>
      ) : (
        <div className="comment-container__wrapper">
          <p>Comments(3)</p>
          <button
            className="container__button"
            aria-label="Sign in to write a comment "
          >
            Write a comment
          </button>
        </div>
      )}
    </div>
  )
}
