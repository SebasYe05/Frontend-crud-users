import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { useAuthContext } from "./context/authContext";
import { PrivateRoute } from "./shared/PrivateRoute";
import { UsersPage } from "./features/users/UsersPage";
import { HomePage } from "./features/home/HomePage";
import { Sidebar } from "./components/Sidebar";
import { AuthPage } from "./features/auth/AuthPage";
import { Toaster } from "react-hot-toast";
import "./App.css";

const toastConfig = {
  position: "top-right",
  toastOptions: {
    style: {
      background: "#1e3a5f",
      color: "#fff",
      borderRadius: "10px",
      fontSize: "0.875rem",
      fontFamily: "var(--font-body)",
    },
    success: { iconTheme: { primary: "#3b82f6", secondary: "#fff" } },
    error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
  },
};

function AppLayout() {
  const { user } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return (
      <>
        <Toaster {...toastConfig} />
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </>
    );
  }

  return (
    <div className="app-layout">
      <Toaster {...toastConfig} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile topbar */}
      <header className="app-topbar">
        <button
          className="app-hamburger"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
        <div className="app-topbar-brand">
          <span className="app-topbar-title">Panel</span>
        </div>
      </header>

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
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}
