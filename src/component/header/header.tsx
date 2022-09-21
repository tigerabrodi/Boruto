import { FaPen } from 'react-icons/fa'

export function Header() {
  return (
    <header>
      <h1 className="header__logo">Boruto</h1>

      <aside className=" aside">
        <button className="aside__write--button">
          <FaPen /> Write
        </button>

        <button className="aside__theme--button"></button>

        <div className="aside__wrapper">
          <img
            className="aside__wrapper--profile"
            src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75"
            alt="profile"
          />
          <h2 className="aside__wrapper--info">
            Sign up or log in to your Boruto account.
          </h2>
          <p className="aside__wrapper--text">Takes less than a few seconds.</p>
          <div className="aside__wrapper--buttons">
            <button>Sign Up</button>
            <button>Login</button>
          </div>
        </div>
      </aside>
    </header>
  )
}
