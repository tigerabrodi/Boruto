import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'

import { AuthContextProvider } from './context/AuthContext'
import { InfoModuleContextProvider } from './context/InfoModuleContext'
import { HeaderMenuContextProvider } from './context/MenuContext'
import { SkeletonContextProvider } from './context/SkeletonContext'
import {
  Header,
  SignUp,
  SignIn,
  Feed,
  CreateProfile,
  Write,
  LoadingSpinner,
  User,
  EditProfile,
} from './files'
import { Article } from './pages/article/article'
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
          <InfoModuleContextProvider>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<User />} />
              <Route path="/edit/profile" element={<EditProfile />} />
              <Route path="/create/post" element={<Write />} />
              <Route path="/onboard/profile" element={<CreateProfile />} />
              <Route path="/article/:id" element={<Article />} />
            </Routes>
          </InfoModuleContextProvider>
        </SkeletonContextProvider>
      </AuthContextProvider>
    </div>
  )
}
