import { FaPen } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import './header.css'
import { DarkMode } from '../theme/darkMode'
import { Authenticated } from './authenticated/Authenticated'
import { NonAuthenticated } from './non-authenticated/NonAuthenticated'
import { useAuthContext } from '../../context/AuthContext'
import { useHeaderMenuContext } from '../../context/MenuContext'

export function Header() {
  const { user } = useAuthContext()
  const { isOpen, setIsOpen } = useHeaderMenuContext()

  const location = useLocation()
  const isHome =
    location.pathname === '/' || location.pathname === '/create/post'

  return (
    <header className="header">
      <Link onClick={() => setIsOpen(false)} to="/">
        <h1 className="header__logo">Boruto</h1>
      </Link>

      <aside className="aside">
        <Link
          to="/create/post"
          className="aside__write--button"
          aria-label="write a blog post"
        >
          <FaPen className="pen" /> Write
        </Link>

        <DarkMode />

        {isHome && (
          <img
            onClick={() => setIsOpen(true)}
            src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75"
            alt="no profile"
            className="aside__profile"
          />
        )}
        {isOpen === true && (
          <div>{user?.uid ? <Authenticated /> : <NonAuthenticated />} </div>
        )}
      </aside>
    </header>
  )
}
