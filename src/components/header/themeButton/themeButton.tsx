/* eslint-disable @typescript-eslint/no-explicit-any */
import './themeButton.css'
import '../../../styles/App.css'
import { useState } from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

export const ThemeButton = () => {
  const [toggle, setToggle] = useState(false)

  const clickedClass = 'clicked'
  const body = document.body
  const lightTheme = 'light'
  const darkTheme = 'dark'
  let theme: any

  if (localStorage) {
    theme = localStorage.getItem('theme')
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme)
  } else {
    body.classList.add(lightTheme)
  }

  const switchTheme = (event: any) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme)
      event.target.classList.remove(clickedClass)
      localStorage.setItem('theme', 'light')
      theme = lightTheme
      setToggle(true)
    } else {
      body.classList.replace(lightTheme, darkTheme)
      event.target.classList.add(clickedClass)
      localStorage.setItem('theme', 'dark')
      theme = darkTheme
      setToggle(false)
    }
  }

  return (
    <div className="toggle-btn">
      {toggle ? (
        <button
          onClick={(event) => switchTheme(event)}
          aria-label="dark mode"
          className="theme__button"
        >
          <BsMoon />
        </button>
      ) : (
        <button
          onClick={(event) => switchTheme(event)}
          aria-label="light mode"
          className="theme__button"
        >
          <BsSun />
        </button>
      )}
    </div>
  )
}
