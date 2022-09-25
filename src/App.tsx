import { Toaster } from 'react-hot-toast'
import {
  Header,
  SignUp,
  LogIn,
  Feed,
  CreateProfile,
  Write,
  LoadingSpinner,
} from './files'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { HeaderMenuContextProvider } from './context/MenuContext'
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
