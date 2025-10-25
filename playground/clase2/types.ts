export type Role = "admin" | "editor" | "viewer" | "colaborador";

/** Interfaz de usuario
 *
 * **Details**
 *
 * Está interfaz se usará para generar el objeto Usuario
 */
export interface User {
  id: string;
  username: string;
  role: Role;
}

/** Interfaz de credenciales de inicio de sesión */
export interface Credentials {
  username: string;
  password: string;
}

/**
 * Interfaz de resultado
 *
 * **Details**
 *
 * Esta interfaz se usará para generar el resultado dinamico
 * */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}
