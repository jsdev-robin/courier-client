export const generateSKU = (index: number, prefix = "SKU") => {
  const paddedIndex = String(index + 1).padStart(4, "0");
  const unique = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${paddedIndex}-${unique}`;
};
