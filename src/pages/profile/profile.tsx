import { FiEdit3 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './profile.css'
export function Profile() {
  return (
    <div className="profile">
      <div className="card">
        <div className="card__wrapper">
          <div className="card__wrapper--primary">
            <img
              src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75"
              alt="profile"
            />
            <p>@username</p>
          </div>
          <div className="card__wrapper--secondary">
            <p>Full Name</p>
            <p>Location</p>
            <p>
              I am a senior Android engineer at Block. In my free time, I like
              to hack around with home automation and spend time in nature with
              my wonderful family 🚀
            </p>
          </div>
        </div>

        <Link to="/edit/profile">
          <FiEdit3 className="pen" />
          Edit
        </Link>
      </div>
    </div>
  )
}
