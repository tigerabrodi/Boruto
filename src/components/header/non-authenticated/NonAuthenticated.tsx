import { Link } from 'react-router-dom'

import { useHeaderMenuContext } from '../../../context/MenuContext'
import './nonauthenticated.css'

export function NonAuthenticated() {
  const { setIsOpen } = useHeaderMenuContext()

  return (
    <div className="non-authenticated">
      <div className="non-authenticated__wrapper">
        <img
          src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75"
          alt="profile"
        />
        <h2 className="non-authenticated__wrapper--info">
          Sign up or log in to your Boruto account.
        </h2>
        <p className="non-authenticated__wrapper--text">
          Takes less than a few seconds.
        </p>
        <div className="non-authenticated__wrapper--links">
          <Link onClick={() => setIsOpen(false)} to="/signup">
            Sign up
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
