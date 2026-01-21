# BookStore Application

A full-stack e-commerce application for books, featuring a modern React frontend and a robust Node.js/Express backend.

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT and Google OAuth 2.0.
- **Book Catalog**: Browse a wide variety of books with search and pagination.
- **Detailed Book Pages**: View book details, ratings, and customer reviews.
- **Cart Management**: Add/remove items from the shopping bag.
- **Wishlist**: Save favorite books for later.
- **Order Management**: Place orders and view order history.
- **Address Management**: Save and manage shipping addresses.
- **Responsive UI**: Beautiful, mobile-friendly design built with React-Bootstrap.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Bootstrap, React-Bootstrap, React-Icons
- **State/Routing**: React Router
- **HTTP Client**: Axios
- **Notifications**: React-Toastify

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, Passport.js (Google Strategy)
- **Environment**: Dotenv

## 📂 Project Structure

```text
book_store/
├── backend/            # Express API
│   ├── src/
│   │   ├── config/     # Database and Passport config
│   │   ├── controllers/# Route handlers
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   └── server.js   # Entry point
├── frontend/           # React App
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Route pages
│   │   └── App.jsx     # Main application component
└── .gitignore          # Root-level git rules
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js installed
- MongoDB URI (Local or Atlas)
- Google OAuth Credentials (for social login)

### 1. Clone the repository
```bash
git clone <repository-url>
cd book_store
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:5000/auth/google/callback
```
Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Run the frontend:
```bash
npm run dev
```

## 📜 Available Scripts

### Backend
- `npm start`: Starts the server normally.
- `npm run dev`: Starts the server with `nodemon` for development.

### Frontend
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build.

## 🤝 Contributing
Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License
[ISC](LICENSE)
