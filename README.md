# 🛍️ ShopScale

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

**A scalable, full-stack e-commerce architecture engineered for performance and reliability.**

[View Demo](https://your-demo-link.com) · [Report Bug](https://github.com/hk12maddheshiya/ShopScale/issues) · [Request Feature](https://github.com/hk12maddheshiya/ShopScale/issues)

</div>

---

## 📖 Overview

**ShopScale** is a robust e-commerce platform built to demonstrate modern full-stack development practices. It leverages the power of **React** for a dynamic frontend and **Node.js/Express** for a high-performance backend. Data integrity is managed via **PostgreSQL** and **Prisma ORM**, ensuring type-safe database queries and efficient relation handling.

Designed with scalability in mind, ShopScale includes secure authentication, complex product filtering, cart state management, and an integrated payment gateway.

## 🚀 Key Features

### 👤 Customer Experience
* **Advanced Product Discovery:** Real-time search by name/description, filtered by category, and price range sorting.
* **Smart Cart System:** Real-time state management for cart additions, quantity adjustments, and total calculations.
* **Secure Checkout:** Integrated **Braintree** payment gateway for safe and seamless transactions.
* **User Dashboard:** Comprehensive profile management, order history tracking, and address management.
* **Authentication:** Secure JWT-based login/signup system with password reset capabilities.

### 🛡️ Admin Dashboard
* **Inventory Control:** Create, update, and manage product stock and details.
* **Category Management:** Dynamic organization of products via category assignment.
* **Order Fulfillment:** View all incoming orders, update processing status, and manage refunds.
* **Visual Management:** Direct image uploads and gallery management for products.

## 💻 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js | Component-based UI architecture |
| **State** | Context API | Global state management for User & Cart |
| **Styling** | Bootstrap | Responsive layout and UI components |
| **Backend** | Node.js & Express | Scalable RESTful API architecture |
| **Database** | PostgreSQL | Relational database system |
| **ORM** | Prisma | Type-safe database client & schema management |
| **Auth** | JWT | Stateless authentication mechanism |
| **Payments** | Braintree | Secure payment processing integration |

## 🗄️ Database Schema

ShopScale uses a relational schema optimized for e-commerce. Below are the core Prisma models:

<details>
<summary><b>Click to view User Model</b></summary>

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  phone     String
  address   Json
  answer    String
  role      Int      @default(0) // 0 = User, 1 = Admin
  orders    Order[]  @relation("BuyerOrders")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
</details>

<details> <summary><b>Click to view Product & Category Models</b></summary>

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
</details>

🛠️ Getting Started
Follow these steps to set up the project locally.

Prerequisites
Node.js (v14+)

PostgreSQL installed and running

npm or yarn

Installation Steps
Clone the repository

Bash

git clone [https://github.com/hk12maddheshiya/ShopScale.git](https://github.com/hk12maddheshiya/ShopScale.git)
cd ShopScale
Install Backend Dependencies

Bash

npm install
Install Frontend Dependencies

Bash

cd client
npm install
cd ..
Environment Configuration Create a .env file in the root directory and add your credentials:

Code snippet

PORT=8080
DATABASE_URL="postgresql://user:password@localhost:5432/shopscale_db"
JWT_SECRET=your_secure_jwt_secret
BRAINTREE_MERCHANT_ID=your_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key
Database Setup

Bash

# Run migrations to create tables
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
Run the Application

Option A: Run concurrently (Recommended)

Bash

npm run dev
Option B: Run separately

Terminal 1 (Backend): npm run server

Terminal 2 (Frontend): cd client && npm start

🔄 Recent Updates & Roadmap
[x] Migration to PostgreSQL: Moved from MongoDB to PostgreSQL for better relational data handling.

[x] Prisma Integration: Implemented Prisma ORM for type safety.

[x] Pagination: Added server-side pagination for product feeds.

[x] Performance: Implemented debouncing for search queries.

[ ] Redis Caching: Planned integration for faster product retrieval.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request
