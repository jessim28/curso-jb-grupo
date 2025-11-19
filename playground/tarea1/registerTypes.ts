/**
 * Listado de roles soportados por la aplicación de registro.
 */
export type Roles = "admin" | "editor" | "viewer" | "colaborador";

/**
 * Credenciales básicas utilizadas tanto para registro como autenticación.
 */
export interface Credentials {
  username: string;
  password: string;
}

/**
 * Datos requeridos para registrar un nuevo usuario.
 */
export interface Register extends Credentials {
  confirmPassword: string;
  role: Roles;
}

/**
 * Representa a un usuario ya registrado en el sistema.
 */
export interface User {
  id: string;
  username: string;
  role: Roles;
  password: string;
  email: string;
}

/**
 * Forma genérica de respuesta asíncrona del servicio de registro.
 */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}
