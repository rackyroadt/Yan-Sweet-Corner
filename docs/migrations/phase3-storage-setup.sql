create policy "Public read images"
on storage.objects for select
using (bucket_id = 'product-images');

create policy "Public upload images"
on storage.objects for insert
with check (bucket_id = 'product-images');

create policy "Public update images"
on storage.objects for update
using (bucket_id = 'product-images');

create policy "Public delete images"
on storage.objects for delete
using (bucket_id = 'product-images');

-- B. Add image_url column to products
alter table products
add column if not exists image_url text;

-- C. Insert Mango Float (was missing from products table)
insert into products (id, name, description, price, stock, unit, image)
values (
  'mango-float',
  'Mango Float',
  'Layers of graham crackers, sweet cream, and ripe Philippine mangoes. A chilled no-bake classic.',
  85,
  20,
  'per cup',
  'mango-float.jpeg'
)
on conflict (id) do nothing;

-- D. Backfill image_url for all 9 products
-- (After running, photos must also exist in the
--  product-images storage bucket with these exact filenames)
update products set image_url = 'https://ccvbkuckyxsukmoysehn.supabase.co/storage/v1/object/public/product-images/berry-float.jpeg' where id = 'berry-float';
update products set image_url = 'https://ccvbkuckyxsukmoysehn.supabase.co/storage/v1/object/public/product-images/cookies.jpeg' where id = 'cookies';
update products set image_url = 'https://ccvbkuckyxsukmoysehn.supabase.co/storage/v1/object/public/product-images/crinkles.jpeg' where id = 'crinkles';
update products set image_url = 'https://ccvbkuckyxsukmoysehn.supabase.co/storage/v1/object/public/product-images/kutsinta.jpeg' where id = 'kutsinta';
update products set image_url = 'https://ccvbkuckyxsukmoysehn.supabase.co/storage/v1/object/public/product-images/leche-flan.png' where id = 'leche-flan';
update products set image_url = 'https://ccvbkuckyxsukmoysehn.supabase.co/storage/v1/object/public/product-images/mango-float.jpeg' where id = 'mango-float';
update products set image_url = 'https://ccvbkuckyxsukmoysehn.supabase.co/storage/v1/object/public/product-images/polvoron.jpeg' where id = 'polvoron';
update products set image_url = 'https://ccvbkuckyxsukmoysehn.supabase.co/storage/v1/object/public/product-images/puto.jpeg' where id = 'puto';
update products set image_url = 'https://ccvbkuckyxsukmoysehn.supabase.co/storage/v1/object/public/product-images/strawberry-float.jpeg' where id = 'strawberry-float';