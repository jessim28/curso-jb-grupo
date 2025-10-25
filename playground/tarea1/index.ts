import { Register, User } from "./registerTypes";
import { register } from "./registerValidate";

// 🔸 Lista de usuarios para registrar
const users: Register[] = [
  {
    username: "admin.Pedro",
    password: "ContraseñaPermitida1",
    confirmPassword: "ContraseñaPermitida1",
    role: "admin",
  },
  {
    username: "editor.Angel",
    password: "ContraseñaPermitida2",
    confirmPassword: "ContraseñaPermitida2",
    role: "editor",
  },
  {
    username: "viewer.Wilmer",
    password: "ContraseñaPermitida3",
    confirmPassword: "ContraseñaPermitida",
    role: "viewer",
  },
  { username: "viewer.Jessica", password: "1234", confirmPassword: "12345", role: "colaborador" },
];

// Formatear salida de usuario
function formatUser(user: User): string {
  return `(${user.id}) ${user.username} | Rol: ${user.role} | Email: ${user.email}`;
}

// Proceso principal
const result = async () => {
  for (const user of users) {
    const res = await register(user);

    if (res.ok && res.data) console.log("[Usuario registrado] :", formatUser(res.data));
    else console.log("[Registro fallido] :", res.message, "| Usuario:", user.username);
  }
};

result();
