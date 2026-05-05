import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { FiUsers, FiLogOut, FiHome, FiGrid } from "react-icons/fi";
import "./Sidebar.css";

export function Sidebar() {
  const { user, isAdmin, logout } = useAuthContext();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user.username
    ? user.username.slice(0, 2).toUpperCase()
    : "U";

  const roleLabel = isAdmin ? "Administrador" : "Usuario";

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <FiGrid size={18} color="#fff" />
        </div>
        <div>
          <div className="sidebar-logo-text">Panel</div>
          <div className="sidebar-logo-sub">Sistema</div>
        </div>
      </div>

      {/* User info */}
      <div className="sidebar-user">
        <div className="sidebar-avatar">{initials}</div>
        <div className="sidebar-user-info">
          <div className="sidebar-username">{user.username || user.name}</div>
          <div className="sidebar-role">{roleLabel}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Principal</div>
        <NavLink
          to="/"
          end
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <FiHome className="sidebar-link-icon" size={17} />
          <span>Inicio</span>
        </NavLink>

        {isAdmin && (
          <>
            <div className="sidebar-section-label">Administración</div>
            <NavLink
              to="/users"
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
            >
              <FiUsers className="sidebar-link-icon" size={17} />
              <span>Usuarios</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <FiLogOut size={16} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
