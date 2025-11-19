/**
 * Casuística de login.
 * - VALIDO -> debería loguear
 * - INVALIDO -> password incorrecto
 * - BLOQUEADO -> user bloqueado
 */
export interface LoginCase {
  name: string;
  username: string;
  password: string;
  shouldLogin: boolean;
}

export const CredentialsCase = Object.freeze({
  VALIDO: {
    name: "usuario válido",
    username: "standard_user",
    password: "secret_sauce",
    shouldLogin: true,
  },
  INVALIDO: {
    name: "password incorrecto",
    username: "standard_user",
    password: "bad_password",
    shouldLogin: false,
  },
  BLOQUEADO: {
    name: "usuario bloqueado",
    username: "locked_out_user",
    password: "secret_sauce",
    shouldLogin: false,
  },
});
