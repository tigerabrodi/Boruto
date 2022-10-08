import { Link } from 'react-router-dom'

import { useHeaderMenuContext } from '../../../context/MenuContext'
import './menu.css'

export function Menu() {
  const { setIsMenuOpen } = useHeaderMenuContext()

  return (
    <div className="menu">
      <div className="menu__wrapper" data-cy="menu">
        <img
          src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75"
          alt=""
          data-cy="menu-empty-avatar"
        />
        <h2 className="menu__wrapper--info" data-cy="menu-text">
          Sign up or log in to your Boruto account.
        </h2>
        <p className="menu__wrapper--text" data-cy="menu-small-text">
          Takes less than a few seconds.
        </p>
        <div className="menu__wrapper--links">
          <Link onClick={() => setIsMenuOpen(false)} to="/signup">
            Sign up
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/signin">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
