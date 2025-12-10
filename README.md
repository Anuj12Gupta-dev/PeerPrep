# Talent IQ - Real-Time Collaborative Coding Platform

Talent IQ is a real-time collaborative coding platform designed to help developers prepare for technical interviews through peer programming sessions. Built with modern web technologies, it enables users to solve coding problems together with video chat, code sharing, and real-time collaboration features.

## 🌟 Key Features

### Core Functionality
- **Real-Time Code Collaboration**: Work together on coding problems using a shared Monaco editor
- **Video & Audio Communication**: Connect face-to-face with built-in video and voice calling
- **Interactive Problem Solving**: Access a curated collection of coding interview problems
- **Session Management**: Create, join, and manage coding sessions with other developers

### Additional Features
- **Problem Difficulty Levels**: Problems categorized by difficulty (Easy, Medium, Hard)
- **Session History**: Track your past practice sessions
- **Active Sessions Discovery**: Browse and join ongoing sessions hosted by others
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

### Frontend
- **React 18+** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **React Router v7** - Declarative routing for React applications
- **React Query (TanStack Query)** - Data fetching and state management
- **Monaco Editor** - Code editor component (same as VS Code)
- **Stream Chat & Video SDK** - Real-time communication APIs
- **Google OAuth** - Authentication and user management

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js v5** - Web application framework
- **MongoDB with Mongoose** - NoSQL database and ODM
- **Inngest** - Event-driven background job processing
- **Stream Chat & Video API** - Real-time communication infrastructure
- **Google OAuth & JWT** - Authentication middleware

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │   Express.js     │    │   MongoDB       │
│  React Router   │◄──►│   Controllers    │◄──►│   (Sessions)    │
│  React Query    │    │   Middleware     │    │                 │
│  Monaco Editor  │    │   Routes         │    │   Stream API    │
│  Stream SDK     │    │   Models         │    │   (Chat/Video)  │
│  Google OAuth   │    │   Lib (Utils)    │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Stream Chat & Video API keys
- Google OAuth Client ID
- Inngest account (optional for production)

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DB_URL=your_mongodb_connection_string
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret_key
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=your_stream_api_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/talent-iq.git
cd talent-iq
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables in both `backend/.env` and `frontend/.env`

5. Start the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
talent-iq/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── lib/            # Utility functions
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Entry point
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies
└── frontend/
    ├── src/
    │   ├── api/            # API clients
    │   ├── components/     # Reusable UI components
    │   ├── contexts/       # React context providers
    │   ├── data/           # Static data
    │   ├── hooks/          # Custom React hooks
    │   ├── lib/            # Utility functions
    │   ├── pages/          # Page components
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # Entry point
    ├── .env                # Environment variables
    └── package.json        # Frontend dependencies
```

## 🔐 Authentication

Talent IQ uses Google OAuth for authentication with JWT tokens stored in secure HTTP-only cookies. The authentication flow works as follows:

1. User clicks "Sign in with Google" on the login page
2. Google OAuth popup appears for user authentication
3. Upon successful authentication, Google returns an ID token
4. Frontend sends the token to the backend `/api/auth/google` endpoint
5. Backend verifies the token with Google and creates/stores user data
6. Backend generates a JWT token and sets it in an HTTP-only cookie
7. Subsequent requests include the cookie for authentication
8. Backend middleware verifies the JWT and attaches user data to requests

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Thanks to all the open-source libraries and tools that made this project possible
- Special thanks to the developer community for continuous inspiration