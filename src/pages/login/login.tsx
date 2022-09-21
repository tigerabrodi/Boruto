import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import './login.css'

export function LogIn() {
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setPasswordShown(!passwordShown)
  }
  return (
    <div className="signin">
      <form className="form">
        <h2>Sign In</h2>

        <div className="form__wrapper">
          <label htmlFor="Email">Email</label>
          <input type="text" name="Name" id="Email" placeholder="" />
        </div>

        <div className="form__wrapper">
          <label htmlFor="Password">Password</label>
          <div className="form__wrapper--wrap">
            <input
              type={passwordShown ? 'text' : 'password'}
              name="password"
              id=" password"
            />{' '}
            <button onClick={togglePassword}>
              {' '}
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="submit" className="form__button">
          Sign in
        </button>
      </form>
    </div>
  )
}
