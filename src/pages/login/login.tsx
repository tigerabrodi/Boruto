import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import './login.css'
import { useFormState } from '../../hooks/useFormState'
import { useSignInWithEmailAndPassword } from '../../hooks/useSignInWithEmailAndPassword'

export function LogIn() {
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

        <div className="form__wrapper">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            aria-required="true"
            value={email}
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
            />
            <button onClick={togglePassword}>
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="submit" className="form__button">
          Sign in
        </button>

        {isSignInError && (
          <p className="alert danger center " role="alert">
            Password or email is invalid.
          </p>
        )}
      </form>
    </div>
  )
}
