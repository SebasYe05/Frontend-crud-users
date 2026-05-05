import { useState, useEffect, useCallback } from "react";
import * as usersService from "./usersService";

export function useUsers() {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await usersService.getUsers();
      setUsers(data);
    } catch {
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const toPayload = (formData) => ({
    fullName:        formData.fullName,
    nameUser:        formData.nameUser,
    pass:            formData.pass || undefined,
    confirmPassword: formData.pass || undefined,
  });

  const createUser = async (formData) => {
    await usersService.createUser(toPayload(formData));
    await fetchUsers();
  };

  const updateUser = async (id, formData) => {
    await usersService.updateUser(id, toPayload(formData));
    await fetchUsers();
  };

  const deleteUser = async (id) => {
    await usersService.deleteUser(id);
    await fetchUsers();
  };

  return { users, loading, error, createUser, updateUser, deleteUser };
}
