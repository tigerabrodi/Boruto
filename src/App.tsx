import { lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'

import { Header, LoadingSpinner } from './components'
import { AuthContextProvider } from './context/AuthContext'
import { InfoModuleContextProvider } from './context/InfoModuleContext'
import { HeaderMenuContextProvider } from './context/MenuContext'
import { ToastOptions } from './styles/theme'

const SignIn = lazy(() => import('./pages/signin'))
const Feed = lazy(() => import('./pages/feed'))
const SignUp = lazy(() => import('./pages/signup'))
const User = lazy(() => import('./pages/user'))
const EditUser = lazy(() => import('./pages/edit/editUser'))
const Profile = lazy(() => import('./pages/profile'))
const Write = lazy(() => import('./pages/write'))
const CreateProfile = lazy(() => import('./pages/signup/createProfile'))
const Article = lazy(() => import('./pages/article'))

export function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <HeaderMenuContextProvider>
          <Header />
        </HeaderMenuContextProvider>
        <LoadingSpinner />
        <Toaster
          position="top-center"
          toastOptions={ToastOptions}
          data-cy="toast-message"
        />
        <InfoModuleContextProvider>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/my-profile" element={<User />} />
            <Route path="/edit/my-profile" element={<EditUser />} />
            <Route path="/profile/:profileID" element={<Profile />} />
            <Route path="/create/post" element={<Write />} />
            <Route path="/onboard/profile" element={<CreateProfile />} />
            <Route path="/article/:id" element={<Article />} />
          </Routes>
        </InfoModuleContextProvider>
      </AuthContextProvider>
    </div>
  )
}
