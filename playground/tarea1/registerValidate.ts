import { randomUUID } from "crypto";
import { Register, Result, User } from "./registerTypes";

/**
 * Verifica si la contraseña cumple con la longitud mínima requerida.
 * @param password Texto completo de la contraseña ingresada.
 * @returns Verdadero si la longitud es de al menos 6 caracteres.
 */
export function validatePasswordLength(password: string): boolean {
  return password.length >= 6;
}

/**
 * Revisa que la contraseña y su confirmación coincidan exactamente.
 */
export function validatePasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

/**
 * Construye un email determinístico con base en el rol y username.
 * Útil para generar datos consistentes en pruebas.
 */
export function generateEmail(role: string, username: string): string {
  return `${role}.${username}@email.com`;
}

/**
 * Realiza todas las validaciones necesarias y retorna un usuario registrado.
 * @param registerData Información capturada en el formulario de registro.
 * @returns Resultado con el usuario creado o el mensaje de error.
 */
export async function register(registerData: Register): Promise<Result<User>> {
  // Simula un pequeño delay asíncrono (por ejemplo, validación contra un servidor)
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!validatePasswordLength(registerData.password)) {
    return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
  }

  if (!validatePasswordMatch(registerData.password, registerData.confirmPassword)) {
    return { ok: false, message: "Las contraseñas no coinciden." };
  }

  const user: User = {
    id: randomUUID(),
    username: registerData.username,
    role: registerData.role,
    password: registerData.password,
    email: `${registerData.role}.${registerData.username}@email.com`,
  };

  return { ok: true, data: user, message: "Registro exitoso." };
}
