import { useState, useRef } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { createAccount } from '../../lib/firebase'
import './signup.css'

export function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      await createAccount(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch {
      setError('Failed to create an account')
    }
  }

  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setPasswordShown(!passwordShown)
  }

  return (
    <div className="signup">
      <form className="form" onSubmit={handleSubmit}>
        {error && <h1>{error}</h1>}
        <h2>Sign Up</h2>
        <div className="form__wrapper">
          <label htmlFor="Name">Name</label>
          <input type="text" name="Name" id="Name" placeholder="" />
        </div>

        <div className="form__wrapper">
          <label htmlFor="Email">Email</label>
          <input
            ref={emailRef}
            type="text"
            name="Name"
            id="Email"
            placeholder=""
          />
        </div>

        <div className="form__wrapper">
          <label htmlFor="Password">Password</label>
          <div className="form__wrapper--wrap">
            <input
              ref={passwordRef}
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
            ref={passwordConfirmRef}
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
