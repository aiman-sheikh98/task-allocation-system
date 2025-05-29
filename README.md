# Welcome to your Lovable project

## Project info

# MERN Stack Machine Test Application

## 📌 Project Overview

This project is a basic MERN stack application built for a machine test. It includes the following features:

1. 🔐 **Admin User Login with JWT Authentication**
2. 👤 **Agent Creation and Management**
3. 📤 **CSV Upload and Task Distribution among Agents**

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **File Upload**: Multer
- **CSV Parsing**: `csv-parser`, `xlsx`

---

## 🚀 Features

### 1. Admin User Login
- Secure login using Email and Password
- Authenticated using JWT
- Redirects to dashboard upon successful login

### 2. Add Agents
- Add agents with Name, Email, Mobile Number (with country code), and Password
- Stores agent data in MongoDB
- Passwords are hashed for security

### 3. Upload CSV & Distribute Tasks
- Upload `.csv`, `.xlsx`, or `.xls` files
- Validates the format and content of the file
- Parses and distributes items equally among 5 agents
- Saves distributed tasks in MongoDB
- View each agent’s assigned tasks from the frontend

---

## 🧾 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-machine-test.git
cd mern-machine-test


```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7f124061-ffeb-4e33-94e7-89b5e7903f38) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
