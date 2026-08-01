/**
 * Resolves the primary product image. Prefers the singular `imageUrl`
 * (current DB shape), falls back to `images[0]` for legacy docs.
 */
export const getProductImage = (product: { imageUrl?: string; images?: string[] }): string => {
  if (product.imageUrl) return product.imageUrl;
  if (product.images && product.images.length > 0) return product.images[0];
  return "https://placehold.co/600x600?text=No+Image";
};
