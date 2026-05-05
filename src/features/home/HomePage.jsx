import { useAuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { FiUsers, FiShield, FiUser, FiArrowRight } from "react-icons/fi";
import "./HomePage.css";

export function HomePage() {
  const { user, isAdmin } = useAuthContext();

  return (
    <div className="home-page">
      {/* Hero greeting */}
      <div className="home-hero">
        <div className="home-hero-badge">
          {isAdmin ? <FiShield size={13} /> : <FiUser size={13} />}
          <span>{isAdmin ? "Administrador" : "Usuario"}</span>
        </div>
        <h1 className="home-hero-title">
          Bienvenido,<br />
          <span className="home-hero-name">{user?.username || user?.name || "usuario"}</span>
        </h1>
        <p className="home-hero-desc">
          Gestiona tu sistema desde el panel de control.
        </p>
      </div>

      {/* Cards */}
      <div className="home-cards">
        {isAdmin && (
          <Link to="/users" className="home-card home-card--blue">
            <div className="home-card-icon">
              <FiUsers size={22} />
            </div>
            <div className="home-card-content">
              <h3>Usuarios</h3>
              <p>Administra los usuarios del sistema, roles y permisos.</p>
            </div>
            <FiArrowRight size={18} className="home-card-arrow" />
          </Link>
        )}

        <div className="home-card home-card--light">
          <div className="home-card-icon home-card-icon--muted">
            <FiUser size={22} />
          </div>
          <div className="home-card-content">
            <h3>Mi cuenta</h3>
            <p>Sesión activa como <strong>{user?.username}</strong> · Rol: {isAdmin ? "Admin" : "Usuario"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
