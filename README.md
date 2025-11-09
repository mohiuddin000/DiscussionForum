💬 Learnato Discussion Forum

Theme: Empower learning through conversation.

A simple discussion forum microservice built for the Learnato Hackathon, where learners and instructors can post questions, reply, and upvote discussions — powered by React, Node.js, and MongoDB.

🚀 Tech Stack

Frontend: React.js + Tailwind CSS

Backend: Node.js + Express.js

Database: MongoDB / MongoDB Atlas

Optional: Docker, Socket.io, Cloud Deployment

⚙️ Setup Instructions
1️⃣ Clone & Install
git clone https://github.com/<your-username>/learnato-forum.git
cd learnato-forum

2️⃣ Backend
cd backend
npm install

Create .env:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/learnato

Run backend:

npm run dev

3️⃣ Frontend
cd ../frontend
npm install

Create .env:

REACT_APP_API_URL=http://localhost:5000

Run frontend:

npm start

🧪 API Routes
Method Endpoint Description
POST /posts Create new post
GET /posts Get all posts
GET /posts/:id Get post with replies
POST /posts/:id/reply Add a reply
POST /posts/:id/upvote Upvote a post
🧩 Features

📝 Create & view posts

💬 Add replies

👍 Upvote discussions

📱 Responsive design

🐳 Docker-ready

🌐 Deployment

Frontend: Vercel / Render

Backend: Render / Cloud Run

Database: MongoDB Atlas

👨‍💻 Author

Mohiuddin — Full Stack Developer
Built for the Learnato Hackathon 2025.
