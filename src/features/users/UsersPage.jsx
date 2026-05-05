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

  // UserResponseDTO: { id, nameUser, fullName, bio, rol }
  const filtered = users.filter((u) =>
    `${u.fullName ?? ""} ${u.nameUser ?? ""}`
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
    } catch (err) {
      toast.error(err?.response?.data?.mensaje || "Error al guardar usuario", {
        id,
      });
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
      <div className="users-header">
        <div>
          <h2 className="users-title">
            <FiUsers size={22} /> Gestión de usuarios
          </h2>
          <p className="users-subtitle">{users.length} usuarios registrados</p>
        </div>
        <button className="btn-primary" onClick={openCreate}>
          <FiUserPlus size={15} /> Nuevo usuario
        </button>
      </div>

      {error && (
        <div className="users-alert">
          <FiAlertTriangle size={16} /> {error}
        </div>
      )}

      <div className="users-card">
        <div className="users-search-bar">
          <FiSearch size={15} className="users-search-icon" />
          <input
            className="users-search"
            placeholder="Buscar por nombre o usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>Usuario</th>
                <th>Biografía</th>
                <th>Rol</th>
                <th className="th-actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="td-center">
                    <span className="spinner" /> Cargando...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="td-center td-muted">
                    {search ? "Sin resultados" : "No hay usuarios registrados"}
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id}>
                    <td className="td-name">{user.fullName}</td>
                    <td className="td-muted">@{user.nameUser}</td>
                    <td className="td-muted">{user.bio || "—"}</td>
                    <td>{roleBadge(user.rol)}</td>
                    <td>
                      <div className="td-actions">
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
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser !== null && (
        <UserForm
          user={selectedUser?.id ? selectedUser : null}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-box modal-box--sm">
            <div className="modal-delete-body">
              <div className="delete-icon-wrap">
                <FiTrash2 size={24} />
              </div>
              <h4>¿Eliminar usuario?</h4>
              <p>
                {deleteConfirm.fullName} (@{deleteConfirm.nameUser})
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
