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

  const createUser = async (formData) => {
    await usersService.createUser({
      nameUser: formData.nameUser,
      fullName: formData.fullName,
      pass: formData.pass,
      confirmPassword: formData.confirmPassword,
    });
    await fetchUsers();
  };

  const updateUser = async (id, formData) => {
    const payload = {
      nameUser: formData.nameUser,
      fullName: formData.fullName,
      bio: formData.bio || "",
      pass: formData.pass || "",
      confirmPassword: formData.confirmPassword || formData.pass || "",
    };
    await usersService.updateUser(id, payload);
    await fetchUsers();
  };

  const deleteUser = async (id) => {
    await usersService.deleteUser(id);
    await fetchUsers();
  };

  return { users, loading, error, createUser, updateUser, deleteUser };
}
