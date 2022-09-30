import { FiClock, FiBookmark, FiStar } from 'react-icons/fi'

import { InfoModule } from '../../../components/modals/InfoModule'
import { useAuthContext } from '../../../context/AuthContext'
import { useInfoModuleContext } from '../../../context/InfoModuleContext'
import './sidebar.css'
export function SideBar() {
  const { isOpen, setIsOpen } = useInfoModuleContext()
  const { user } = useAuthContext()

  return (
    <>
      {isOpen === true && <InfoModule />}

      <aside className="sidebar">
        <button className="sidebar__latest">
          <FiClock className="icon" />
          Latest
        </button>
        <button className="sidebar__top">
          <FiStar className="icon" />
          Top
        </button>

        {user?.uid ? (
          <button className="sidebar__bookmarks">
            <FiBookmark className="icon" />
            Bookmarks
          </button>
        ) : (
          <button
            className="sidebar__bookmarks"
            onClick={() => setIsOpen(true)}
          >
            <FiBookmark className="icon" />
            Bookmarks
          </button>
        )}

        <div className="line"></div>
        <footer>
          <p>
            Built with
            <span className="footer__emoji" aria-label="love">
              &nbsp;💙&nbsp;
            </span>
            by&nbsp;
            <a href="https://github.com/mirayatech" target="_blank">
              Miraya
            </a>
          </p>
        </footer>
      </aside>
    </>
  )
}
