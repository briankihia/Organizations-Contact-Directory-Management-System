About
This project is a simple and effective web application designed to manage organizations and their contacts in one centralized directory. It allows users to register organizations, store detailed information about them, and maintain organized contacts related to each organization.

Built with a Django backend, React frontend, and PostgreSQL database, it serves as a practical demonstration of full-stack development, CRUD operations, and relational data handling.

Features
Organizations Management

Add, edit, and view organizations with fields like name, industry, website, tax ID, and logo.

Industry classification through a predefined list.

Activate or deactivate organizations without deleting data.

Contacts Management

Add and edit contacts linked to organizations.

Mark one contact as the primary contact per organization.

Store multiple contact methods: email, office phone, mobile.

Activate or deactivate contacts.

Search & Export

Search organizations by name or industry with live filtering.

Export organizations and contacts as CSV files for easy sharing or reporting.

Technologies Used
Backend: Django (Python)

Frontend: React.js

Database: PostgreSQL

API: RESTful endpoints

Other Tools: Axios (for API calls), Material UI (for styling), CSV export utilities

Database Overview
The database contains three main tables:

Industries: Lists industry types (e.g., Technology, Finance).

Organizations: Stores organization details with a foreign key linking to Industries.

Contacts: Stores individuals linked to organizations, including contact info and a flag for primary contact.

Motivation
This project was created as part of an internship program to solidify understanding of:

Full-stack web development using Django and React.

Designing relational databases with PostgreSQL.

Implementing CRUD operations and managing user roles.

Building clean, maintainable, and scalable code.

How to Run
Backend:

Set up a Python virtual environment.

Install dependencies from requirements.txt.

Configure PostgreSQL database settings.

Run Django migrations and start the server.

Frontend:

Navigate to the React app folder.

Run npm install to install dependencies.

Start the React development server with npm start.

Future Improvements
Add user authentication and role-based access control.

Improve UI/UX with more advanced filtering and sorting.

Implement pagination and bulk import/export features.

Deploy the application on a cloud service for public access.

Contact
Feel free to check out the code and reach out if you want to collaborate or ask questions.