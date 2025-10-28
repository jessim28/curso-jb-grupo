import { randomUUID } from "crypto";
import { Register, Result, User } from "./registerTypes";

// Validar longitud mínima de contraseña
export function validatePasswordLength(password: string): boolean {
  return password.length >= 6;
}

// Validar coincidencia entre contraseña y confirmación
export function validatePasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

// Generar email dinámico según el rol y username
export function generateEmail(role: string, username: string): string {
  return `${role}.${username}@email.com`;
}

// Función principal para validar y registrar
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
