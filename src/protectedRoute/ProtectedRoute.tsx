/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from 'react-router-dom'

import { useAuthContext } from '../context/AuthContext'

export const ProtectedRoute = ({ children }: any) => {
  const { user } = useAuthContext()

  console.log('Check user in Private: ', user)
  if (!user) {
    return <Navigate to="/" />
  }
  return children
}
