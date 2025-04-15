

# Crime Report and Alert System

## Overview

The **Crime Report and Alert System** is a web application designed to enable citizens to report crimes in real time, as well as receive safety alerts and crime-related information. The system features an admin dashboard for administrators to view and manage crime reports, as well as track trends and analytics related to crime data.

### Key Features:
- **Report Crimes**: Citizens can report crimes, including incident type, location, and other details.
- **Quick Report Button**: A quick way to submit reports for emergencies.
- **Crime Data & Analytics**: Admins can view crime statistics, trends, and generate analysis based on crime data.
- **Safety Alerts**: Users can receive safety alerts based on recent crime activity in their area.
- **Admin Panel**: Admins have access to all submitted reports, user management, and analytics.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Flask
- **Database**: SQLite (for simplicity)
- **Other Tools**:
  - SQLAlchemy (for ORM)
  - Alembic (for database migrations)
  - Flask-Migrate (for managing database migrations)
  - Flask-CORS (to allow cross-origin requests between frontend and backend)

## Installation

Follow the instructions below to get the project up and running locally on your machine.

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/KairuMaina/crime-alert-system.git
cd crime-alert-system
```

### 2. Set Up the Backend (Flask)

#### a) Create a Virtual Environment

To isolate the project dependencies, create a Python virtual environment:

```bash
python3 -m venv venv
```

#### b) Activate the Virtual Environment

- On **Linux/macOS**:

  ```bash
  source venv/bin/activate
  ```

- On **Windows**:

  ```bash
  .\venv\Scripts\activate
  ```

#### c) Install Dependencies

Install the required Python dependencies:

```bash
pip install -r backend/requirements.txt
```

If you're running into issues with dependencies, ensure that `Flask`, `Flask-SQLAlchemy`, `Flask-CORS`, `Flask-Migrate`, and `Alembic` are installed.

#### d) Set Up the Database

Run the migrations to set up the database tables:

```bash
cd backend
flask db upgrade
```

This will initialize your SQLite database and create the necessary tables (e.g., **Tag**, **CrimeReport**, **User**, etc.).

#### e) Start the Flask Server

Run the backend server:

```bash
flask run
```

This will start the Flask server at `http://127.0.0.1:5000/`.

### 3. Set Up the Frontend (React)

#### a) Install Node.js and NPM

Make sure you have **Node.js** and **npm** installed. You can check this by running:

```bash
node -v
npm -v
```

If you don’t have them installed, download and install them from [nodejs.org](https://nodejs.org/).

#### b) Install Frontend Dependencies

Navigate to the frontend folder and install the required Node.js dependencies:

```bash
cd frontend
npm install
```

This will install all necessary dependencies from the `package.json` file.

#### c) Start the React Development Server

To run the frontend in development mode, execute the following command:

```bash
npm start
```

This will start the React server, typically available at `http://localhost:3000/`.

### 4. Testing the Application

1. **Frontend**: Open `http://localhost:3000/` in your browser. You should see the Crime Report and Alert System UI.
2. **Backend**: The backend will be running at `http://127.0.0.1:5000/`. You can test the API routes using Postman or curl commands.

## API Endpoints

The **Crime Report and Alert System** exposes the following API endpoints for interacting with the backend:

### 1. **POST /api/reports**

- **Description**: Allows citizens to submit crime reports.
- **Request Body**:
  ```json
  {
    "description": "Crime description",
    "date_reported": "2025-04-15T12:00:00",
    "user_id": 1,
    "severity_level": "High",
    "location_id": 1,
    "tags": ["Robbery", "Assault"]
  }
  ```
- **Response**: 
  ```json
  {
    "message": "Crime report submitted successfully."
  }
  ```

### 2. **GET /api/reports**

- **Description**: Retrieves all crime reports.
- **Response**: 
  ```json
  [
    {
      "id": 1,
      "description": "Crime description",
      "date_reported": "2025-04-15T12:00:00",
      "severity_level": "High",
      "user_id": 1,
      "location_id": 1
    }
  ]
  ```

### 3. **GET /api/reports/{id}**

- **Description**: Retrieves a specific crime report by its ID.
- **Response**:
  ```json
  {
    "id": 1,
    "description": "Crime description",
    "date_reported": "2025-04-15T12:00:00",
    "severity_level": "High",
    "user_id": 1,
    "location_id": 1
  }
  ```

### 4. **POST /api/users**

- **Description**: Allows an admin to create a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created successfully."
  }
  ```

### Error Handling

If there is an issue with the request or the server, you will receive a corresponding error message:

- **400 Bad Request**: If the request is missing required fields.
- **404 Not Found**: If the resource (e.g., a report or user) is not found.
- **500 Internal Server Error**: If there is an issue on the server side.

Example of an error response:

```json
{
  "error": "No such column: crime_report.severity_level"
}
```

## Project Structure

### Backend

```
/backend
  ├── /migrations
  ├── /models
      └── crime_report.py
      └── user.py
      └── tag.py
  ├── /routes
      └── crime_alerts.py
  ├── /templates
  ├── app.py
  ├── config.py
  ├── requirements.txt
  └── manage.py
```

### Frontend

```
/frontend
  ├── /src
      ├── /components
          └── CrimeReportForm.js
          └── CrimeList.js
      ├── App.js
      ├── index.js
  ├── /public
      └── index.html
  ├── package.json
```

### Explanation of Important Files

- **Backend**:
  - `app.py`: Main entry point for the Flask application.
  - `models/`: Contains ORM models for the application (e.g., `CrimeReport`, `Tag`, etc.).
  - `routes/`: Contains API route handlers.
  - `migrations/`: Stores database migration files.
  - `requirements.txt`: Contains Python dependencies for the project.
  
- **Frontend**:
  - `src/components/`: Contains React components used in the app.
  - `App.js`: The main React component that sets up routing and displays components.
  - `index.js`: Entry point for the React app, where the root component is rendered.
  - `public/index.html`: The static HTML file that contains the root div for the React app.

## Database Schema

Here are the tables defined in the database:

- **User**: Stores user information.
- **CrimeReport**: Stores information about reported crimes.
- **Tag**: Stores tags related to crime reports.
- **CrimeLocation**: Stores geographic data related to crime incidents.
- **UserLocation**: Stores geographic data about users (if needed for alerts).
  
The **Tag** table already exists, so if you run into errors during migrations (e.g., table already exists), you might need to manually drop the existing tables or adjust the schema.

## Troubleshooting

1. **Migration Issues**: If you encounter migration errors (e.g., table already exists), try resetting the database by dropping all tables and re-running migrations:
   ```bash
   flask db downgrade base
   flask db upgrade
   ```

2. **CORS Issues**: If the frontend is not able to communicate with the backend, ensure that Flask-CORS is set up correctly, and the `CORS` middleware is properly configured in `app.py`.

3. **Backend Not Running**: If the backend server isn’t running, make sure that Flask is correctly installed and the app is launched using `flask run`.

## Contributing

Feel free to fork this project and submit pull requests. If you find any bugs or would like to see new features, please create an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

