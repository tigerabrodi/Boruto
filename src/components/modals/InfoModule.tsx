import { FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import './modals.css'

type InfoModuleProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function InfoModule({ setIsOpen }: InfoModuleProps) {
  return (
    <div onClick={() => setIsOpen(false)} className="overlay-info-modal">
      <div className="info-modal">
        <h1 className="info-modal--title">
          Hey, 👋 sign up or sign in to interact.
        </h1>
        <p className="info-modal--text">
          This blog is powered by Boruto . We need to authenticate you via
          Boruto in order for you to interact with the author.
        </p>
        <div className="info-modal--links">
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Sign in</Link>
        </div>

        <button className="info-modal--close" aria-label="close modal">
          <FiX />
        </button>
      </div>
    </div>
  )
}
