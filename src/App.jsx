import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { PrivateRoute } from './shared/PrivateRoute'
import { LoginPage }   from './features/auth/LoginPage'
import { UsersPage }   from './features/users/UsersPage'
import { HomePage }   from './features/home/HomePage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Solo ADMIN */}
          <Route element={<PrivateRoute adminOnly />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}