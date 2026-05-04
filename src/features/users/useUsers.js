import { useState, useEffect, useCallback } from "react";
import * as usersService from "./usersService";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = async (data) => {
    await usersService.createUser(data);
    await fetchUsers();
  };

  const updateUser = async (id, data) => {
    await usersService.updateUser(id, data);
    await fetchUsers();
  };

  const deleteUser = async (id) => {
    await usersService.deleteUser(id);
    await fetchUsers();
  };

  return { users, loading, error, createUser, updateUser, deleteUser };
}
