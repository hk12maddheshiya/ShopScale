Prisma integration notes

1. Environment
- Set DATABASE_URL in your environment (Postgres). Example:
  export DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
  (On Windows PowerShell: $env:DATABASE_URL='postgresql://user:pass@localhost:5432/dbname')

2. Install and generate
- npm install prisma @prisma/client
- npx prisma generate

3. Migrate and seed
- npx prisma migrate dev --name init
- node prisma/seed.js

4. Using the Prisma client
- Import the client from `config/prisma.js` or use the helper model wrappers in `models/prisma*.js`.

5. Notes on mapping
- Table names are mapped to the original model/collection names using @@map so migrating can preserve naming.
- OrderStatus enum values are mapped to keep the same strings used previously in Mongoose.

6. Next steps
- Replace Mongoose models usage in controllers with `models/prisma*.js` wrappers or call `config/prisma.js` directly.
