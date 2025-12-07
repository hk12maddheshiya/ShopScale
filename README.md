# 🛍️ ShopScale

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

**A full-stack e-commerce platform built for performance and scalability.**

[View Demo](https://your-demo-link.com) · [Report Bug](https://github.com/hk12maddheshiya/ShopScale/issues) · [Request Feature](https://github.com/hk12maddheshiya/ShopScale/issues)

</div>

---

## 📖 Overview

**ShopScale** is a robust e-commerce application built using **React, Node.js, and PostgreSQL** with **Prisma ORM**. It provides a complete shopping experience with secure user authentication, complex product management, real-time cart functionality, and integrated payment processing.

## 🚀 Features

### User Features
* **Product Browsing:**
    * Browse all products with advanced filtering.
    * Search products by name and description.
    * Filter by category and price range.
    * Responsive product image gallery.
* **Shopping Experience:**
    * Add products to cart with real-time total calculation.
    * Adjust quantities and manage cart state.
    * Secure checkout process.
* **User Account:**
    * JWT-based authentication.
    * Profile management and order history.
    * Password reset functionality.

### Admin Features
* **Product Management:** Create, update, and manage inventory/images.
* **Category Management:** Organize products via dynamic categories.
* **Order Management:** Track payment status, update order process, and handle refunds.

## 💻 Technical Stack

### Frontend
* **Framework:** React.js
* **State Management:** Context API
* **Styling:** Bootstrap
* **HTTP Client:** Axios

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** JWT (JSON Web Tokens)
* **File Upload:** Express-formidable
* **Payment:** Braintree integration

## 📝 Database Schema

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  phone     String
  address   Json
  answer    String
  role      Int      @default(0)
  orders    Order[]  @relation("BuyerOrders")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
Product & Category Models
Code snippet

model Category {
  id       Int       @id @default(autoincrement())
  name     String?
  slug     String?   @db.VarChar(191)
  products Product[]
}

model Product {
  id          Int         @id @default(autoincrement())
  name        String
  slug        String
  description String
  price       Float
  categoryId  Int
  category    Category    @relation(fields: [categoryId], references: [id])
  quantity    Int
  photo       Bytes?
  shipping    Boolean?
  orders      OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}
```
## 🚀 Getting Started

### Prerequisites
* Node.js v14 or higher
* PostgreSQL database
* npm or yarn

### Installation Steps

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/hk12maddheshiya/ShopScale.git](https://github.com/hk12maddheshiya/ShopScale.git)
    cd ShopScale
    ```

2.  **Install dependencies**
    ```bash
    # Install backend dependencies
    npm install

    # Install frontend dependencies
    cd client
    npm install
    ```

3.  **Configure environment variables**
    Create a `.env` file in the root directory and add:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/shopscale_db"
    JWT_SECRET=your_jwt_secret
    BRAINTREE_MERCHANT_ID=your_merchant_id
    BRAINTREE_PUBLIC_KEY=your_public_key
    BRAINTREE_PRIVATE_KEY=your_private_key
    ```

4.  **Set up the database**
    ```bash
    # Run Prisma migrations
    npx prisma migrate dev

    # Generate Prisma Client
    npx prisma generate
    ```

5.  **Start the development servers**
    ```bash
    # Start backend (from root directory)
    npm run dev

    # Start frontend (from client directory)
    cd client
    npm start
    ```

## 🔄 Recent Updates

### Database Features
* PostgreSQL with Prisma ORM for robust data management.
* Implemented proper database relations.
* Enhanced query performance with Prisma Client.
* Added type safety with Prisma's generated types.

### API Improvements
* Added pagination for product listings.
* Enhanced search functionality.
* Improved error handling and validation.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request
