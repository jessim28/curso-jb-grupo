import { randomUUID } from "crypto";
import { Credentials, Result, Role, User } from "./types";

export const login = async (cred: Credentials): Promise<Result<User>> => {
  const { username, password } = cred; // admin.Carlos editor.Jose

  /** Metodo 1 */
  // let role: Role = "colaborador";

  // if (username.startsWith("admin")) {
  //   role = "admin";
  // } else if (username.startsWith("editor")) {
  //   role = "editor";
  // } else {
  //   role = "colaborador";
  // }

  /** Metodo 2 */
  let roleMetodo2: Role = "colaborador";

  switch (username.split(".")[0]) {
    case "admin":
      roleMetodo2 = "admin";
      break;
    case "editor":
      roleMetodo2 = "editor";
      break;
    case "viewer":
      roleMetodo2 = "viewer";
      break;
    default:
      roleMetodo2 = "colaborador";
      break;
  }

  if (password === "ContraseñaPermitida") {
    return {
      ok: true,
      data: {
        id: randomUUID(),
        username: username,
        role: roleMetodo2,
      },
    };
  } else {
    return { ok: false, message: "Usuario no permitido" };
  }
};

export const formatUser = (user: User): string => {
  return `Usuario ingresado: ${user.username}, con role: ${user.role} y con id: ${user.id}`; // "usuario" + user.username + " con role: " +
};
