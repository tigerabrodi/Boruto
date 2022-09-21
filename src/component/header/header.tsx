import { useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { BsMoon } from 'react-icons/bs'
import './header.css'
import '../../App.css'
import { DarkMode } from '../theme/darkMode'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="header">
      <h1 className="header__logo">Boruto</h1>

      <aside className="aside">
        <a className="aside__write--button" aria-label="write a blog post">
          <FaPen className="pen" /> Write
        </a>

        <DarkMode />

        <img
          onClick={() => setIsOpen(true)}
          src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75"
          alt="no profile"
          className="aside__profile"
        />

        {isOpen === true && (
          <div className="aside__wrapper">
            <img
              className="aside__wrapper--profile"
              src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75"
              alt="profile"
            />
            <h2 className="aside__wrapper--info">
              Sign up or log in to your Boruto account.
            </h2>
            <p className="aside__wrapper--text">
              Takes less than a few seconds.
            </p>
            <div className="aside__wrapper--buttons">
              <button>Sign up</button>
              <button>Log in</button>
            </div>
          </div>
        )}
      </aside>
    </header>
  )
}
