/**
 * Formats a price value, treating it as cents if it's a large number
 * @param price - Price in cents (e.g., 10050 for R$ 100.50)
 * @returns Formatted price string (e.g., "100.50")
 */
export const formatPrice = (price: number | undefined | null): string => {
  if (price === undefined || price === null) {
    return "0.00";
  }

  // If price is greater than 100, treat it as cents (divide by 100)
  // Otherwise, assume it's already in the correct format
  const priceInReais = price > 100 ? price / 100 : price;

  return priceInReais.toFixed(2);
};
