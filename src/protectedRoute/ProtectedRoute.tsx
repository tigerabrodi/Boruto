import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { AuthContextProviderProps } from '../context/AuthContext'

type ProtectedRouteProps = AuthContextProviderProps

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuthContext()

  if (!user) {
    return <Navigate to="/" />
  }
  return children
}

export default ProtectedRoute
