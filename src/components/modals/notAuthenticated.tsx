import { FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

type NotAuthenticatedProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function NotAuthenticated({ setIsOpen }: NotAuthenticatedProps) {
  return (
    <div onClick={() => setIsOpen(false)} className="overlay">
      <div className="modal__authenticatication">
        <h1 className="modal__authenticatication--title">
          Hey, 👋 sign up or sign in to interact.
        </h1>
        <p className="modal__authenticatication--text">
          This blog is powered by Boruto . We need to authenticate you via
          Boruto in order for you to interact with the author.
        </p>
        <div className="modal__authenticatication--links">
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Sign in</Link>
        </div>

        <button
          className="modal__authenticatication--close"
          aria-label="close modal"
        >
          <FiX />
        </button>
      </div>
    </div>
  )
}
