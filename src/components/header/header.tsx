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
        <Link onClick={() => setIsMenuOpen(false)} to="/">
          <span className="header__logo">Boruto</span>
        </Link>

        <aside className="aside">
          {user?.email ? (
            <Link
              to="/create/post"
              className="aside__write--button"
              aria-label="write a blog post"
            >
              <FaPen className="pen" /> Write
            </Link>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="aside__write--button"
              aria-label="write a blog post"
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
