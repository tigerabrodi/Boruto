import { Header, SignUp, LogIn } from './files'
import { Routes, Route } from 'react-router-dom'

export function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  )
}
