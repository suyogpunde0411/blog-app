# Simple Online Blog Application

A complete full-stack blog application built with React (Vite) and Express/Node.js, specifically designed to be easy to explain and deploy on Ubuntu/Linux EC2 instances for Cloud Computing practicals.

## 📝 Features
- **Frontend**: Clean React UI (Vite) with simple, non-Tailwind CSS.
- **Backend**: RESTful API using Node.js, Express, and MongoDB.
- **Functionality**: Create, Read, Update, and Delete (CRUD) blog posts.
- **Cross-Platform**: Designed to work flawlessly on Windows during development and Ubuntu/Linux during deployment.

## 📁 Folder Structure
```
blog-app/
├── client/                 # Frontend React Application (Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/                # React Source Code
│       ├── App.jsx         # Main application logic
│       ├── index.css       # Clean, custom styling
│       ├── main.jsx        # App entry point
│       └── components/     # Reusable UI components
│           ├── PostList.jsx
│           ├── PostItem.jsx
│           └── PostForm.jsx
└── server/                 # Backend Node.js Application
    ├── package.json
    ├── server.js           # Main Express server setup
    ├── .env.example        # Environment variables example
    ├── models/
    │   └── BlogPost.js     # Mongoose database schema
    └── routes/
        └── posts.js        # API endpoints (GET, POST, PUT, DELETE)
```

## 💻 How to Run Locally on Windows

### Prerequisites
1. **Node.js** installed on your system.
2. **MongoDB** running locally (or a MongoDB Atlas URI).

### 1. Start the Backend
1. Open a terminal and navigate to the `server` folder:
   ```cmd
   cd server
   ```
2. Install dependencies:
   ```cmd
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/blogdb
   ```
4. Start the server:
   ```cmd
   npm start
   ```
   *The server will run on http://localhost:5000*

### 2. Start the Frontend
1. Open a **new** terminal and navigate to the `client` folder:
   ```cmd
   cd client
   ```
2. Install dependencies:
   ```cmd
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```cmd
   npm run dev
   ```
   *The frontend will be accessible (usually at http://localhost:5173).*

---

## 🚀 How to Deploy on Ubuntu EC2

### 1. Initial Server Setup (Ubuntu)
SSH into your EC2 instance and update the package list:
```bash
sudo apt update
sudo apt upgrade -y
```

Install Node.js and npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Install Nginx and PM2 (Process Manager):
```bash
sudo apt install -y nginx
sudo npm install -g pm2
```

Install MongoDB (if not using MongoDB Atlas):
```bash
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### 2. Clone/Upload Project
Upload this `blog-app` folder to your EC2 instance (e.g., in `/home/ubuntu/blog-app`).

### 3. Deploy Backend (with PM2)
1. Navigate to the server folder:
   ```bash
   cd /home/ubuntu/blog-app/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file (adjust `MONGO_URI` if using Atlas):
   ```bash
   nano .env
   # Add: PORT=5000 and MONGO_URI=mongodb://127.0.0.1:27017/blogdb
   ```
4. Start the backend with PM2 to keep it running in the background:
   ```bash
   pm2 start server.js --name "blog-backend"
   pm2 save
   pm2 startup
   ```

### 4. Deploy Frontend (with Nginx)
1. Navigate to the client folder:
   ```bash
   cd /home/ubuntu/blog-app/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the React project for production:
   ```bash
   npm run build
   ```
4. Move the built files to Nginx's web directory:
   ```bash
   sudo cp -r dist/* /var/www/html/
   ```
5. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

*Make sure to open Port 80 (HTTP) and Port 5000 (Custom TCP) in your EC2 Security Group settings!*

---

## 🎓 Viva Explanation (Simple Words)

**"What is this project?"**
> "This is a full-stack blog application. The frontend is built with React which lets users see, create, and manage blog posts. The backend is built with Node.js and Express, which acts as a bridge. When the React frontend asks for data, the Express backend fetches it from a MongoDB database and sends it back."

**"What are the Environment Variables for?"**
> "Environment variables keep sensitive or environment-specific data hidden from the code. For example, `MONGO_URI` stores the database connection string, so I don't have to hardcode my database password. `VITE_API_URL` tells the frontend where the backend server is located."

**"How does the Frontend talk to the Backend?"**
> "The frontend uses standard HTTP requests (via the native `fetch` API). It sends a `GET` request to retrieve posts, a `POST` request to create a post, a `PUT` request to edit, and a `DELETE` request to remove a post. The backend listens for these specific routes (e.g., `/api/posts`) and executes the corresponding database operation."

**"How is it deployed?"**
> "On the EC2 server, the Node.js backend runs continuously in the background using a tool called **PM2**. The React frontend is compiled into static HTML/CSS/JS files (`npm run build`) and served to the internet using **Nginx**, which is a powerful web server. MongoDB is installed directly on the Ubuntu server to store the application data."
