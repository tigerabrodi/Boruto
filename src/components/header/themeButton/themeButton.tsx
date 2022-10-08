/* eslint-disable @typescript-eslint/no-explicit-any */
import './themeButton.css'
import '../../../styles/App.css'
import { useEffect, useState } from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

const body = document.body
const LIGHT_THEME = 'light'
const DARK_THEME = 'dark'
const THEME = 'theme'

type Theme = typeof LIGHT_THEME | typeof DARK_THEME

export const ThemeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const themeFromLocalstorage = localStorage.getItem(THEME)

    if (themeFromLocalstorage) {
      setTheme(themeFromLocalstorage as Theme)

      if (theme === LIGHT_THEME || theme === DARK_THEME) {
        body.classList.add(theme)
      } else {
        body.classList.add(LIGHT_THEME)
      }
    }
  }, [])

  const switchTheme = () => {
    if (theme === DARK_THEME) {
      body.classList.replace(DARK_THEME, LIGHT_THEME)
      localStorage.setItem(THEME, LIGHT_THEME)
      setTheme(LIGHT_THEME)
      setIsDarkMode(true)
    } else {
      body.classList.replace(LIGHT_THEME, DARK_THEME)
      localStorage.setItem(THEME, DARK_THEME)
      setTheme(DARK_THEME)
      setIsDarkMode(false)
    }
  }

  return (
    <div className="header__aside--theme">
      {isDarkMode ? (
        <button
          onClick={switchTheme}
          aria-label="dark mode"
          className="theme__button clicked"
        >
          <BsMoon />
        </button>
      ) : (
        <button
          onClick={switchTheme}
          aria-label="light mode"
          className="theme__button"
        >
          <BsSun />
        </button>
      )}
    </div>
  )
}
