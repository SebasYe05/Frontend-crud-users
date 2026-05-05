import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { useAuthContext } from './context/authContext'
import { PrivateRoute } from './shared/PrivateRoute'
import { LoginPage }   from './features/auth/LoginPage'
import { RegisterPage } from './features/auth/RegisterPage'
import { UsersPage }   from './features/users/UsersPage'
import { HomePage }   from './features/home/HomePage'
import { Sidebar }     from './components/Sidebar'
import { Toaster }     from 'react-hot-toast'
import './App.css'

const toastConfig = {
  position: 'top-right',
  toastOptions: {
    style: {
      background: '#1e3a5f',
      color: '#fff',
      borderRadius: '10px',
      fontSize: '0.875rem',
      fontFamily: 'var(--font-body)',
    },
    success: { iconTheme: { primary: '#3b82f6', secondary: '#fff' } },
    error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
  },
}

function AppLayout() {
  const { user } = useAuthContext()

  if (!user) {
    return (
      <>
        <Toaster {...toastConfig} />
        <Routes>
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*"         element={<Navigate to="/login" replace />} />
        </Routes>
      </>
    )
  }

  return (
    <div className="app-layout">
      <Toaster {...toastConfig} />
      <Sidebar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<PrivateRoute adminOnly />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  )
}