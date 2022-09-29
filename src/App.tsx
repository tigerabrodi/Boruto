import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'

import { AuthContextProvider } from './context/AuthContext'
import { HeaderMenuContextProvider } from './context/MenuContext'
import { SkeletonContextProvider } from './context/SkeletonContext'
import {
  Header,
  SignUp,
  LogIn,
  Feed,
  CreateProfile,
  Write,
  LoadingSpinner,
  Profile,
  EditProfile,
} from './files'
import { ToastOptions } from './styles/theme'

export function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <SkeletonContextProvider>
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
            <Route path="/edit/profile" element={<EditProfile />} />
            <Route path="/create/post" element={<Write />} />
            <Route path="/onboard/profile" element={<CreateProfile />} />
          </Routes>
        </SkeletonContextProvider>
      </AuthContextProvider>
    </div>
  )
}
