const isolatedImages = new Set([
  'backpack', 'bottle-angle', 'bottle-back', 'bottle-blue', 'bottle-white',
  'bottle', 'kit', 'mug', 'notebook', 'pens', 'tumbler',
]);

/** Map legacy catalog URLs to transparent cutouts while leaving editorial photos intact. */
export function productImage(source: string | null | undefined, fallback = '/images/products/kit.webp') {
  if (!source) return fallback;
  try {
    const url = new URL(source, 'http://brindespro.local');
    const match = url.pathname.match(/^\/images\/([^/]+)\.png$/);
    if (match && isolatedImages.has(match[1])) return `/images/products/${match[1]}.webp`;
  } catch {
    return fallback;
  }
  return source;
}
