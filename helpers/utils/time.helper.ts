export const DateFormatter = (d: Date): string => {
  
  const dd = String( d.getDate()).padStart(2, "0");
  const mm = String( d.getMonth() + 1).padStart(2, "0");
  const aa = String( d.getFullYear()).slice(-2); //2025 se omite slice(-2) si se quiere el año completo
  const hh = String( d.getHours()).padStart(2, "0");
  const min = String( d.getMinutes()).padStart(2, "0");

  return `${dd}-${mm}-${aa}_${hh}-${min}`;
};
