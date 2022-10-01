import { FaPen } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import './header.css'
import { useAuthContext } from '../../context/AuthContext'
import { useInfoModuleContext } from '../../context/InfoModuleContext'
import { useHeaderMenuContext } from '../../context/MenuContext'
import { InfoModule } from '../modals/InfoModule'
import { Avatar } from './avatar/avatar'
import { AuthMenu } from './menu/authMenu'
import { Menu } from './menu/menu'
import { ThemeButton } from './themeButton/themeButton'

export function Header() {
  const { isOpen, setIsOpen } = useInfoModuleContext()
  const { isMenuOpen, setIsMenuOpen } = useHeaderMenuContext()
  const { user } = useAuthContext()

  return (
    <>
      {isOpen === true && <InfoModule />}

      <header className="header">
        <Link
          onClick={() => setIsMenuOpen(false)}
          to="/"
          className="header__logo"
        >
          <span>Boruto</span>
        </Link>

        <aside className="header__aside">
          {user?.email ? (
            <Link
              to="/create/post"
              className="header__aside--button"
              aria-label="write a blog post"
            >
              <FaPen className="pen" /> Write
            </Link>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="header__aside--button"
              aria-label="To create a blog post, you must sign in"
            >
              <FaPen className="pen" /> Write
            </button>
          )}

          <ThemeButton />

          <Avatar />

          {isMenuOpen === true && (
            <div>{user?.uid ? <AuthMenu /> : <Menu />} </div>
          )}
        </aside>
      </header>
    </>
  )
}
