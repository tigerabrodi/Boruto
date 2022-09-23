import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { createAccount } from '../../lib/firebase'
import './signup.css'

export function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setPasswordShown(!passwordShown)
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (password !== password) {
      setError('Passwords do not match')
    }

    try {
      setError('')
      await createAccount(email, password)
      navigate('/onboard/profile')
    } catch {
      setError('Failed to create an account')
    }
  }

  return (
    <div className="signup">
      <form className="form" onSubmit={handleSubmit}>
        {error && <h1>{error}</h1>}
        <h2>Sign Up</h2>

        <div className="form__wrapper">
          <label htmlFor="Email">Email</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
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
