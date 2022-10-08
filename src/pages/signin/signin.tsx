import './signin.css'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useFormState } from '../../hooks/useFormState'
import { useSignInWithEmailAndPassword } from '../../hooks/useSignInWithEmailAndPassword'

export default function SignIn() {
  const [passwordShown, setPasswordShown] = useState(false)

  const { isSignInError, signInWithEmailAndPassword } =
    useSignInWithEmailAndPassword()

  const {
    handleChange,
    formState: { password, email },
  } = useFormState({
    password: '',
    email: '',
  })

  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setPasswordShown(!passwordShown)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    signInWithEmailAndPassword(email, password)
  }

  return (
    <div className="signin">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {isSignInError && (
          <p className="alert danger center" role="alert">
            Password or email is invalid.
          </p>
        )}
        <div className="form__wrapper">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            aria-required="true"
            value={email}
            data-cy="sign-in-email"
          />
        </div>

        <div className="form__wrapper">
          <label htmlFor="Password">Password</label>
          <div className="form__wrapper--wrap">
            <input
              type={passwordShown ? 'text' : 'password'}
              name="password"
              id=" password"
              onChange={handleChange}
              aria-required="true"
              value={password}
              data-cy="sign-in-password"
            />
            <button onClick={togglePassword} data-cy="sign-in-toggle-password">
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="form__button"
          data-cy="sign-in-submit-button"
        >
          Sign in
        </button>
        <p className="form__link">
          Do not have an account yet? <Link to="/signup">Sign up.</Link>{' '}
        </p>
      </form>
    </div>
  )
}
