# EcommerceApp

EcommerceApp is a full-stack e-commerce platform built using **React** on the frontend and **Node.js** with **Express** on the backend. This platform allows users to browse and buy products, add them to a shopping cart, and proceed with secure payments. Admins have access to a dashboard to manage products, categories, and orders.

## Features

### User Features:
- **Browse Products**: View all available products with the ability to filter and sort by categories and price.
- **Add to Cart**: Easily add products to the shopping cart for later purchase.
- **Checkout and Payment**: Integrated with **Braintree** for secure payments.
- **User Authentication**: Secure login and sign-up functionality.
- **Order Tracking**: View the status of current and past orders.

### Admin Features:
- **Dashboard**: Access to a centralized admin dashboard to manage the store.
- **Product Management**: Create, update, and delete products.
- **Category Management**: Create and manage product categories.
- **Order Management**: View customer orders and update order statuses.

## Technology Stack

### Frontend:
- **React**: Powered by Create React App for fast and efficient development.
- **Bootstrap**: Utilized for responsive design and layout.
- **React Router**: For navigation between pages.
- **Axios**: For handling HTTP requests to the backend.
- **Ant Design**: UI library for polished components.
- **Braintree Web Drop-In**: Payment integration for seamless checkout.
- **React Hot Toast** & **React Toastify**: For user notifications.

### Backend:
- **Node.js** with **Express**: REST API for handling requests and business logic.
- **MongoDB**: For storing user, product, and order data.
- **JWT Authentication**: Secure user authentication.
- **Braintree**: Payment gateway integration.
- **SendGrid**: For sending email notifications.
- **Mongoose**: For interacting with MongoDB.
- **Nodemon**: For automatically restarting the server during development.

## Installation

### Prerequisites:
- **Node.js** and **npm** installed on your system.
- **MongoDB** running locally or a cloud-based MongoDB instance.

### Backend Setup:
1. Clone the repository.
   ```bash
   git clone https://github.com/your-repo/ecommerceapp.git
   cd ecommerceapp

## Installation

### Backend Setup:

1. **Install server dependencies:**
   ```bash
   npm install


2. **Create a .env file in the root directory and add your MongoDB URI, Braintree API keys, and other environment variables:**

       MONGO_URI=your_mongodb_uri
       BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
       BRAINTREE_PUBLIC_KEY=your_braintree_public_key
       BRAINTREE_PRIVATE_KEY=your_braintree_private_key
       JWT_SECRET=your_jwt_secret
       SENDGRID_API_KEY=your_sendgrid_api_key

3.**Frontend Setup:
Navigate to the client folder:**

     cd client


4.**Install client dependencies:**

    npm install


5.**Start the React development server:**

    npm start

6.**Running Both Backend and Frontend Simultaneously:**

    npm run dev

# Usage
- **Admin Access:** Navigate to /admin to access the admin dashboard.
- **User Access:** Create an account or log in to start shopping! 
# Scripts
    npm run server: Start the Express server.
    npm run client: Start the React development server.
    npm run dev: Start both client and server with concurrent execution.
  
# License
This project is licensed under the ISC License.

# Author
Developed by Abhinav
