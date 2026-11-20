RSVK SILVER STORE — VERSION 2
================================

Files:
- index.html: customer-facing catalogue; reads active products from Supabase.
- admin.html: Supabase Auth admin login, product CRUD, and multiple image upload UI.
- README.txt: this guide.

Supabase project URL:
https://vpuiwfxlrsgmcduxmuiy.supabase.co

The Supabase publishable key is already configured in both HTML files.
It is intended for browser use. NEVER put a service_role/secret key in these files.

IMPORTANT STATUS / LIMITATIONS
1. Admin login checks Supabase Auth and verifies the user's ID in public.admin_users.
2. Product add/edit/delete requires your existing products RLS policies to permit authenticated admins (is_admin()).
3. Photo upload requires Storage policies on storage.objects for bucket_id = 'product-images'. The bucket being public only enables public reads; it does NOT automatically permit uploads.
4. Customer order submission is intentionally NOT enabled yet. Do not create an open anon INSERT policy on orders/order_items. A secure Supabase Edge Function must validate products/prices and write the order safely.
5. No online payment is included.
6. Replace any test product details with verified inventory details before public launch.

HOW TO TEST
- Upload the three files to a static hosting provider (GitHub Pages works) or open via a local web server.
- Open admin.html and sign in using the Auth email/password.
- If sign-in works but admin verification fails, confirm the signed-in Auth user ID exists in public.admin_users.
- If product list errors, check existing products table RLS policies.
- If photo upload fails, Storage upload policies are missing or restrictive. Do not make the bucket writable to everyone.
- Open index.html to see active products.

Database fields expected from the existing schema:
products: id, name, slug, description, category, purity, weight_grams, price, stock_quantity, is_active, created_at, updated_at
product_images: id, product_id, storage_path, alt_text, sort_order, created_at
orders/order_items are not yet wired to public order submission.

Never share your admin password or Supabase secret/service_role key.


V3 ORDER REQUEST CONNECTION
1. In Supabase SQL Editor, run the additional grants in order_permissions.sql.
2. Keep the submit_order_request SQL function you already created.
3. Extract this V3 ZIP and replace BOTH index.html and admin.html in the folder you use.
4. Open index.html, submit a test order request, then sign in to admin.html and tap Refresh orders.
5. The customer receives an order-request reference. The shop must call to confirm stock and delivery.
No online payment is collected. Do not add a service_role key to these files.
