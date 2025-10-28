// Tipo de roles permitidos
export type Roles = "admin" | "editor" | "viewer" | "colaborador";

/**
* Registra un usuario.
* @param data Datos de registro { username, password, confirmPassword, 
role }.
* @returns { ok:true, data:User } | { ok:false, message:string }
* const r = await register({ username:"carlos", password:"123456", 
confirmPassword:"123456", role: "admin" });
*/
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
