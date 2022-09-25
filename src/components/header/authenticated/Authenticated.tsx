import { logOut } from '../../../lib/firebase'
import './authenticated.css'
import { FiUser, FiLogOut, FiBookmark } from 'react-icons/fi'

export function Authenticated() {
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="authenticated">
      <div className="authenticated__wrapper">
        <img
          src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75"
          alt="profile"
        />
        <div className="authenticated__wrapper--info">
          <p>Full Name</p>
          <p>@username</p>
        </div>
      </div>
      <button className="authenticated__profile--button">
        <FiUser className="icon" /> My Profile
      </button>
      <button className="authenticated__bookmarks--button">
        <FiBookmark className="icon" />
        My Bookmarks
      </button>
      <button onClick={handleSignOut} className="authenticated__logout--button">
        <FiLogOut className="icon" /> Log out
      </button>
    </div>
  )
}
