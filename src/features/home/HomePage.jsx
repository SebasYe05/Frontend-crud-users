import { useAuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

export function HomePage() {
  const { user, isAdmin, logout } = useAuthContext();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <h1 className="display-4 mb-4">Bienvenido</h1>
        {user ? (
          <>
            <p className="lead">Hola, {user.username || user.name}</p>
            <p className="text-muted">Rol: {user.role}</p>
            <div className="d-flex gap-2 justify-content-center mt-4">
              {isAdmin && (
                <Link to="/users" className="btn btn-primary">
                  Gestionar usuarios
                </Link>
              )}
              <button onClick={logout} className="btn btn-outline-secondary">
                Cerrar sesión
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="lead">Inicia sesión para acceder al sistema</p>
            <Link to="/login" className="btn btn-primary btn-lg">
              Iniciar sesión
            </Link>
          </>
        )}
      </div>
    </div>
  );
}