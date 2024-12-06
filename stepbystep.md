## Installasi Library

1.  Install joi untuk validasi

    - `npm install joi`

2.  Install express js

    - `npm install express`

3.  Install type express utnuk bantuan autocomplite

    - `npm install --save-dev @types/express`

4.  Install prisma untuk ORM

    - `npm install --save-dev prisma`

5.  Install winston untuk logger

    - `npm install winston`

6.  Install bcrypt untuk hashing password

    - `npm install bcrypt`
    - `npm install --save-dev @types/bcrypt`

7.  Install UUID

    - `npm install UUID`
    - `npm install --save-dev @types/uuid`

8.  Install jest untuk unit test

    - `npm install jest --save-dev jest`

9.  Install babel untuk jest modul

    - `npm install --save-dev babel-jest  @babel/preset-env`

10. Setup config babel untuk jest

    - Edit package.json

    ```json
    {
      // configurasi lainya...

      "scripts": {
        "test": "jest -i" // ubah menjadi jest
      },

      // tambahkan seperti di bawah ini
      "jest": {
        "transform": {
          "^.+\\.[t|j]sx?$": "babel-jest"
        }
      }

      // configurasi lainya...
    }
    ```

    - Buat file configurasi babel dengan nama `babel.config.json`

    ```json
    {
      "presets": ["@babel/preset-env"]
    }
    ```

11. Install supertest untuk mempermudah testing dengan expres

    - `npm install --save-dev supertest @types/supertest`

## Setup Prisma

1. Jalankan perintah `npx prisma init`
   maka akan muncul folder baru dengan nama prisma dan file `.env`

2. Sesuaikan DATABASE_URL pada file `.env` sesuai dengan database yang digunakan

   ```env
   DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   ```

3. Membuat model user pada filr `prisma/schema.prisma`

   ```js
   model User {
    username String @id @db.VarChar(100)
    password String @db.VarChar(100)
    name String @db.VarChar(100)
    token String? @db.VarChar(100)

    @@map("users") // pemberian nama user didatabase
   }
   ```

4. Printah-printah prisma lainya

   - `npx prisma migrate dev --create-only` untuk membuat file migrasi

   - `npx prisma migrate` untuk migrasi kedatabase
