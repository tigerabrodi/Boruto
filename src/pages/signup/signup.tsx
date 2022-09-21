import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import './signup.css'

export function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setPasswordShown(!passwordShown)
  }
  return (
    <div className="signup">
      <form className="form">
        <h2>Sign Up</h2>
        <div className="form__wrapper">
          <label htmlFor="Name">Name</label>
          <input type="text" name="Name" id="Name" placeholder="" />
        </div>

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

        <div className="form__wrapper">
          <label htmlFor="confirm password">Confirm Your Password</label>
          <input
            type={passwordShown ? 'text' : 'password'}
            name="password"
            id="confrim password"
          />{' '}
        </div>
        <button type="submit" className="form__button">
          Sign up
        </button>
      </form>
    </div>
  )
}
