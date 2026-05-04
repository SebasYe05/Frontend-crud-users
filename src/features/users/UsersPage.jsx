import { useState } from 'react'
import { useUsers } from './useUsers'
import { UserForm } from './UserForm'

export function UsersPage() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers()
  const [selectedUser, setSelectedUser] = useState(null)  // null = cerrado, {} = nuevo, user = editar
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const openCreate = () => setSelectedUser({})
  const openEdit   = (user) => setSelectedUser(user)
  const closeModal = () => setSelectedUser(null)

  const handleSubmit = (data) =>
    selectedUser?.id
      ? updateUser(selectedUser.id, data)
      : createUser(data)

  const handleDelete = async (id) => {
    await deleteUser(id)
    setDeleteConfirm(null)
  }

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 fw-semibold">Gestión de usuarios</h4>
        <button className="btn btn-primary" onClick={openCreate}>
          + Nuevo usuario
        </button>
      </div>

      {/* Error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Tabla */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <span className="spinner-border spinner-border-sm me-2" />
                    Cargando...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-muted">
                    No hay usuarios registrados
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="align-middle">
                      {user.nombre} {user.apellido}
                    </td>
                    <td className="align-middle">{user.email}</td>
                    <td className="align-middle">
                      <span className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-secondary'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="text-end align-middle">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => openEdit(user)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setDeleteConfirm(user)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal crear/editar */}
      {selectedUser !== null && (
        <UserForm
          user={selectedUser?.id ? selectedUser : null}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}

      {/* Modal confirmar eliminación */}
      {deleteConfirm && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center py-4">
                <p className="mb-1 fw-semibold">¿Eliminar usuario?</p>
                <p className="text-muted mb-4" style={{ fontSize: 14 }}>
                  {deleteConfirm.nombre} {deleteConfirm.apellido}
                </p>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleDelete(deleteConfirm.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-secondary"
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
  )
}