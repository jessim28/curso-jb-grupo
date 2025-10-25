/**
 * Calcula el total de elementos activos.
 *
 * **Details**
 *
 * @param items - Lista de elementos evaluados.
 * @returns Número de elementos activos o `0` si la lista está vacía.
 *
 * **Usage**
 * @example
 *
 * ```ts
 * <input id="123" />
 * const total = contarActivos(["a", "b"]);
 * console.log(total); // 2
 * ```
 */
export function contarActivos(items: string[]): number {
  return items.length || 0;
}

/**
 * Normaliza un nombre propio.
 * @param nombre - Cadena de entrada.
 * @returns Cadena con primera letra en mayúscula y resto en minúscula.
 * @throws Error - Si `nombre` es vacío o solo espacios.
 * @example
 * ```ts
 * const nombreNormalizado = normalizarNombre("juAn");
 * console.log(nombreNormalizado) // "Juan"
 * ```
 */
export function normalizarNombre(nombre: string): string {
  const limpio = nombre.trim();
  if (!limpio || limpio.length === 0) throw new Error("El nombre no puede ser vacío");
  return (limpio.at(0) ?? "").toUpperCase() + limpio.slice(1).toLowerCase();
}

const nombre = "cArLoS RamIrEz";

console.log(`Ingresaste ${contarActivos(nombre.split(" "))} nombres`);

console.log("Mi primero archivo ts, soy ", normalizarNombre(nombre));
