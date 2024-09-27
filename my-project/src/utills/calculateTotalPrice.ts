// src/utils/calculateTotalPrice.ts

/**
 * Utility function to calculate total price
 * @param price - The price of a single item
 * @param qty - The quantity of items
 * @returns total price as a number
 */
export function calculateTotalPrice(price: number, qty: number): number {
    return parseFloat((price * qty).toFixed(2));
  }
  