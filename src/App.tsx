import { Header, SignUp, LogIn, Feed, CreateProfile, Write } from './files'
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
          <Route path="/onboard/profile" element={<CreateProfile />} />
          <Route path="/onboard/profile" element={<CreateProfile />} />
          <Route path="/create/post" element={<Write />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}
