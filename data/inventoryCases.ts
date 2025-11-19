/**
 * Casos de prueba para el flujo de inventory (data-driven).
 *
 * @example
 * const c = InventoryCases[0];
 * console.log(c.name); // "HiLo_1-3-5"
 */
export const InventoryCases = Object.freeze([
  { name: 'HiLo_1-3-5', sort: 'hilo', pick: [0, 2, 4], expectedBadge: 3 },
  { name: 'LoHi_2-4', sort: 'lohi', pick: [1, 3], expectedBadge: 2 },
  { name: 'AZ_1-only', sort: 'az', pick: [0], expectedBadge: 1 },
]) as ReadonlyArray<{
  name: string;
  sort: 'hilo' | 'lohi' | 'az';
  pick: number[];
  expectedBadge: number;
}>;