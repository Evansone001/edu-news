
// function to get image url
export const getImageUrl = (image: { 
  url?: string | Blob | undefined;
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
} | string | undefined): string => {
  if (!image) return '/default-image.jpg';
  if (typeof image === 'string') return image;
  if (image.url) return image.url.toString();
  if (image.asset?.url) return image.asset.url;
  return '/default-image.jpg';
};
