// Tipo de roles permitidos
export type Roles = "admin" | "editor" | "viewer" | "colaborador";

// Interfaz de credenciales (entrada)
export interface Credentials {
  username: string;
  password: string;
}

// Interfaz de registro
export interface Register extends Credentials {
  confirmPassword: string;
  role: Roles;
}

// Interfaz de usuario registrado
export interface User {
  id: string;
  username: string;
  role: Roles;
  password: string;
  email: string;
}

// Resultado genérico
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}
