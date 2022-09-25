import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'

import { AuthContextProvider } from './context/AuthContext'
import { HeaderMenuContextProvider } from './context/MenuContext'
import {
  Header,
  SignUp,
  LogIn,
  Feed,
  CreateProfile,
  Write,
  LoadingSpinner,
  Profile,
} from './files'
import { ProtectedRoute } from './protectedRoute/ProtectedRoute'
import { ToastOptions } from './styles/theme'

export function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <HeaderMenuContextProvider>
          <Header />
        </HeaderMenuContextProvider>
        <LoadingSpinner />
        <Toaster position="top-center" toastOptions={ToastOptions} />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create/post" element={<Write />} />
          <Route path="/onboard/profile" element={<CreateProfile />} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}
