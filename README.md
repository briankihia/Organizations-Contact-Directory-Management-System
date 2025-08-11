
# 📇 Organizations Contact Directory System

**Personal Project | Internship Practice**  
🗓️ Completed: 09 July 2025

---

## ✨ About

This project is a **simple yet powerful** web app that helps you manage organizations and their contacts in one centralized directory.

Built with **Django** (backend), **React** (frontend), and **PostgreSQL** (database), it demonstrates full-stack development skills — handling CRUD operations, relational data, and clean UI.

---

## 🚀 Features

### 🏢 Organization Management
- Create, edit, and view organizations with details like name, industry, website, tax ID, and logo
- Industry classification using a predefined dropdown list for consistency
- Activate/deactivate organizations without deleting data

### 👥 Contact Management
- Add and manage contacts linked to organizations
- Mark one primary contact per organization
- Store multiple contact methods: email, office phone, mobile
- Activate/deactivate contacts easily

### 🔍 Search & Export
- Live search/filter organizations by name or industry
- Export organizations and contacts as CSV files for reporting or sharing

---

## 🛠️ Technologies Used

| Backend    | Frontend    | Database    | Others               |
|------------|-------------|-------------|----------------------|
| Django     | React.js    | PostgreSQL  | Axios, Material UI, CSV export utilities |

---

## 🗄️ Database Overview

- **Industries**: Industry types (e.g., Technology, Finance)  
- **Organizations**: Detailed organization info linked to industries  
- **Contacts**: Individuals linked to organizations, including primary contact flag and multiple contact methods

---

## 🎯 Motivation

Created as part of an internship to:
- Strengthen full-stack web development skills  
- Design and manage relational databases  
- Implement user-friendly CRUD operations  
- Build scalable, maintainable codebases  

---

## ⚙️ How to Run

### Backend
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Configure PostgreSQL database settings in Django

# Run migrations and start server
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

---

## 🔮 Future Improvements

- Add user authentication & role-based permissions  
- Enhance UI with better filtering, sorting, and pagination  
- Bulk import/export functionality  
- Deploy on cloud platforms (Heroku, AWS, etc.)  

---

## 📬 Contact

Feel free to explore the code and reach out if you'd like to collaborate or have questions!

---

*Made with ❤️ and ☕ during my internship journey.*
