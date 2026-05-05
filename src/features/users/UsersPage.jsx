import { useState } from "react";
import { useUsers } from "./useUsers";
import { UserForm } from "./UserForm";
import toast from "react-hot-toast";
import {
  FiUserPlus,
  FiEdit2,
  FiTrash2,
  FiUsers,
  FiAlertTriangle,
  FiSearch,
} from "react-icons/fi";
import "./UsersPage.css";

export function UsersPage() {
  const { users, loading, error, createUser, updateUser, deleteUser } =
    useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    `${u.name} ${u.lastName} ${u.nameUser} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const openCreate = () => setSelectedUser({});
  const openEdit = (user) => setSelectedUser(user);
  const closeModal = () => setSelectedUser(null);

  const handleSubmit = async (data) => {
    const id = toast.loading(
      selectedUser?.id ? "Guardando cambios..." : "Creando usuario...",
    );
    try {
      selectedUser?.id
        ? await updateUser(selectedUser.id, data)
        : await createUser(data);
      toast.success(
        selectedUser?.id ? "Usuario actualizado" : "Usuario creado",
        { id },
      );
    } catch {
      toast.error("Error al guardar usuario", { id });
    }
  };

  const handleDelete = async (user) => {
    const id = toast.loading("Eliminando...");
    try {
      await deleteUser(user.id);
      toast.success("Usuario eliminado", { id });
    } catch {
      toast.error("Error al eliminar", { id });
    }
    setDeleteConfirm(null);
  };

  const roleBadge = (rol) => {
    const isAdmin = rol === "ROLE_ADMIN";
    return (
      <span
        className={`role-badge ${isAdmin ? "role-badge--admin" : "role-badge--user"}`}
      >
        {isAdmin ? "Admin" : "Usuario"}
      </span>
    );
  };

  return (
    <div className="users-page">
      {/* Header */}
      <div className="users-header">
        <div>
          <h2 className="users-title">
            <FiUsers size={22} />
            Gestión de usuarios
          </h2>
          <p className="users-subtitle">{users.length} usuarios registrados</p>
        </div>
        <button className="btn-primary" onClick={openCreate}>
          <FiUserPlus size={15} />
          Nuevo usuario
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="users-alert">
          <FiAlertTriangle size={16} />
          {error}
        </div>
      )}

      {/* Table card */}
      <div className="users-card">
        {/* Search */}
        <div className="users-search-bar">
          <FiSearch size={15} className="users-search-icon" />
          <input
            className="users-search"
            placeholder="Buscar por nombre, usuario o correo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>Nombre Usuario</th>
                <th>Biografía</th>
                <th>Rol</th>
                <th className="th-actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="td-center">
                    <span className="spinner" /> Cargando...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="td-center td-muted">
                    {search
                      ? "Sin resultados para tu búsqueda"
                      : "No hay usuarios registrados"}
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id}>
                    <td className="td-name">{user.fullName}</td>
                    <td className="td-muted">@{user.nameUser}</td>
                    <td>
                      {user.bio || (
                        <span className="td-muted">Sin biografía</span>
                      )}
                    </td>
                    <td>{roleBadge(user.rol)}</td>
                    <td className="td-actions">
                      <button
                        className="btn-icon btn-icon--edit"
                        onClick={() => openEdit(user)}
                      >
                        <FiEdit2 size={14} /> Editar
                      </button>
                      <button
                        className="btn-icon btn-icon--delete"
                        onClick={() => setDeleteConfirm(user)}
                      >
                        <FiTrash2 size={14} /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit modal */}
      {selectedUser !== null && (
        <UserForm
          user={selectedUser?.id ? selectedUser : null}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-box modal-box--sm">
            <div className="modal-delete-body">
              <div className="delete-icon-wrap">
                <FiTrash2 size={24} />
              </div>
              <h4>¿Eliminar usuario?</h4>
              <p>
                {deleteConfirm.name} {deleteConfirm.lastName}
              </p>
              <div className="modal-delete-actions">
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  <FiTrash2 size={14} /> Eliminar
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
