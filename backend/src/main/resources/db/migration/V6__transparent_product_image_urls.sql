-- Point catalog records at isolated product cutouts. Editorial photography keeps
-- the original /images assets and is not changed by this migration.
update categories
set image_url = replace(concat('/images/products/', substring(image_url, 9)), '.png', '.webp')
where image_url in (
  '/images/backpack.png', '/images/bottle-angle.png', '/images/bottle-back.png',
  '/images/bottle-blue.png', '/images/bottle-white.png', '/images/bottle.png',
  '/images/kit.png', '/images/mug.png', '/images/notebook.png', '/images/pens.png',
  '/images/tumbler.png'
);

update products
set image_url = replace(concat('/images/products/', substring(image_url, 9)), '.png', '.webp')
where image_url in (
  '/images/backpack.png', '/images/bottle-angle.png', '/images/bottle-back.png',
  '/images/bottle-blue.png', '/images/bottle-white.png', '/images/bottle.png',
  '/images/kit.png', '/images/mug.png', '/images/notebook.png', '/images/pens.png',
  '/images/tumbler.png'
);

update product_variants
set image_url = replace(concat('/images/products/', substring(image_url, 9)), '.png', '.webp')
where image_url in (
  '/images/backpack.png', '/images/bottle-angle.png', '/images/bottle-back.png',
  '/images/bottle-blue.png', '/images/bottle-white.png', '/images/bottle.png',
  '/images/kit.png', '/images/mug.png', '/images/notebook.png', '/images/pens.png',
  '/images/tumbler.png'
);

update product_images
set image_url = replace(concat('/images/products/', substring(image_url, 9)), '.png', '.webp')
where image_url in (
  '/images/backpack.png', '/images/bottle-angle.png', '/images/bottle-back.png',
  '/images/bottle-blue.png', '/images/bottle-white.png', '/images/bottle.png',
  '/images/kit.png', '/images/mug.png', '/images/notebook.png', '/images/pens.png',
  '/images/tumbler.png'
);
