import { useCallback, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useFormState } from '../../hooks/useFormState'
import { doc, getDoc } from 'firebase/firestore'
import { firebaseDb } from '../../lib/firebase'
import { useCreateUserWithEmailAndPassword } from '../../hooks/useCreateUserWithEmailAndPassword'
import './signup.css'
import { functionsDebounce } from 'all-of-just'
import { useLoadingStore } from '../../lib/store'

export function SignUp() {
  const [isUsernameError, setIsUsernameError] = useState(false)
  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [isEmailInvalid, setIsEmailInvalid] = useState(false)
  const [isEmailError, setIsEmailError] = useState(false)
  const [isEmailTaken, setIsEmailTaken] = useState(false)
  const [isPasswordError, setIsPasswordError] = useState(false)
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)

  const { createUserWithEmailAndPassword, signUpError } =
    useCreateUserWithEmailAndPassword()

  const navigate = useNavigate()
  const { setStatus } = useLoadingStore()

  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setPasswordShown(!passwordShown)
  }

  const {
    handleChange,
    formState: { username, password, confirmPassword, email },
  } = useFormState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  })

  const isAnyFieldEmpty =
    !username.length ||
    !password.length ||
    !confirmPassword.length ||
    !email.length

  const canUserSignUp = () => {
    const isPasswordTooShort = password.length < 6
    if (isPasswordTooShort) {
      setIsPasswordError(true)
      return setTimeout(() => {
        setIsPasswordError(false)
      }, 3000)
    }

    const isPasswordNotMatching = password !== confirmPassword
    if (isPasswordNotMatching) {
      setIsConfirmPasswordError(true)
      return setTimeout(() => {
        setIsConfirmPasswordError(false)
      }, 3000)
    }

    if (isEmailInvalid) {
      setIsEmailError(true)
      return setTimeout(() => {
        setIsEmailError(false)
      }, 3000)
    }
    return true
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setIsEmailTaken(false)
    setIsEmailError(false)

    if (canUserSignUp() === true) {
      createUserWithEmailAndPassword(email, password, username)
      navigate('/onboard/profile')
    }
  }

  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    functionsDebounce(async (username: string) => {
      if (username.length >= 3) {
        setStatus('loading')

        const usernameDocRef = doc(firebaseDb, `usernames/${username}`)
        const usernameDocSnapshot = await getDoc(usernameDocRef)
        const usernameAlreadyExists = usernameDocSnapshot.exists()
        setStatus('success')

        if (usernameAlreadyExists) {
          setIsUsernameValid(false)
          setIsUsernameError(true)
        } else {
          setIsUsernameError(false)
          setIsUsernameValid(true)
        }
      }
    }, 500),
    []
  )

  useEffect(() => {
    checkUsername(username)
  }, [checkUsername, username])

  useEffect(() => {
    if (signUpError && signUpError.code === 'auth/email-already-in-use') {
      setIsEmailError(false)
      setIsEmailTaken(true)
      setTimeout(() => {
        setIsEmailTaken(false)
      }, 3000)
    }
  }, [signUpError])

  return (
    <div className="signup">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h2>Sign Up</h2>
        <div className="form__wrapper ">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            aria-invalid={isUsernameError ? 'true' : 'false'}
            onChange={handleChange}
            aria-required="true"
          />
          {isUsernameError && (
            <p className="alert danger" role="alert">
              Username is already taken.
            </p>
          )}
          {isUsernameValid && (
            <p className="alert success" role="alert success">
              Username is valid.
            </p>
          )}
        </div>
        <div className="form__wrapper ">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => {
              handleChange(event)
              setIsEmailInvalid(!event.target.validity.valid)
            }}
            aria-invalid={isEmailError ? 'true' : 'false'}
            aria-required="true"
          />
          {isEmailError && (
            <p className="alert danger" role="alert">
              Email is not valid.
            </p>
          )}
          {isEmailTaken && (
            <p className="alert danger" role="alert">
              Email is already taken.
            </p>
          )}
        </div>

        <div className="form__wrapper ">
          <label htmlFor="password">Password</label>{' '}
          <div className="form__wrapper--wrap">
            <input
              id="password"
              name="password"
              type={passwordShown ? 'text' : 'password'}
              value={password}
              onChange={handleChange}
              aria-invalid={isPasswordError ? 'true' : 'false'}
              aria-required="true"
            />
            {isPasswordError && (
              <p className="alert danger" role="alert">
                Password must be at least 6 characters.
              </p>
            )}
            <button onClick={togglePassword}>
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>{' '}
          </div>
        </div>

        <div className="form__wrapper">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type={passwordShown ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleChange}
            aria-invalid={isConfirmPasswordError ? 'true' : 'false'}
            aria-required="true"
          />
          {isConfirmPasswordError && (
            <p className="alert danger" role="alert">
              Passwords do not match.
            </p>
          )}
        </div>
        <button
          className="form__button"
          type="submit"
          disabled={isAnyFieldEmpty || isUsernameError}
        >
          Sign Up
        </button>
        <p className="form__link">
          Already have an account? <Link to="/login">Sign in.</Link>{' '}
        </p>
      </form>
    </div>
  )
}
