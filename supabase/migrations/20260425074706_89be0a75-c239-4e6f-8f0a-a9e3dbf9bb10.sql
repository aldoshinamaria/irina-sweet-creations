-- Усиливаем INSERT для orders с валидацией данных
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

CREATE POLICY "Anyone can create valid orders"
  ON public.orders FOR INSERT
  WITH CHECK (
    char_length(customer_name) BETWEEN 2 AND 100
    AND char_length(customer_phone) BETWEEN 5 AND 30
    AND (customer_email IS NULL OR customer_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
    AND (comment IS NULL OR char_length(comment) <= 2000)
    AND (filling IS NULL OR char_length(filling) <= 200)
    AND (size IS NULL OR char_length(size) <= 100)
  );

-- Закрываем листинг bucket: публичный доступ только к конкретным файлам по URL,
-- листинг файлов разрешён только админам
DROP POLICY IF EXISTS "Anyone can view product images" ON storage.objects;

CREATE POLICY "Admins can list product images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin')
  );