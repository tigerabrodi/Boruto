import { Header, SignUp, LogIn, Feed } from './files'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'

export function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}
