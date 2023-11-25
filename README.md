# Customer Relationship Management Project

This project is a Customer Relationship Management (CRM) system built using Spring Boot for the backend and Angular for the frontend. It includes CRUD operations, user authentication, authorization, and utilizes Bootstrap, Angular Material, and PrimeNG for the UI components.

## Features

- **CRUD Operations:** Perform Create, Read, Update, and Delete operations on customer data.
- **User Authentication:** Secure user authentication system with login and signup functionality.
- **Authorization:** Implement role-based access control to restrict actions based on user roles.
- **UI Frameworks:**
  - Bootstrap: for responsive and visually appealing design.
  - Angular Material: for Angular components and styles.
  - PrimeNG: for additional UI components.

## Prerequisites

Before running the application, ensure you have the following installed:

- Java Development Kit (JDK)
- Node.js and npm
- Angular CLI
- MongoDB (or any other preferred database)

## Getting Started

### Backend (Spring Boot)

1. Clone the repository:

    git clone https://github.com/your-username/your-crm-project.git

2. Navigate to the backend directory:

    cd backend

3. Build and run the Spring Boot application:

    ./mvnw spring-boot:run

   The backend will be accessible at `http://localhost:8080`.

### Frontend (Angular)

1. Navigate to the frontend directory:

    cd frontend

2. Install dependencies:

    npm install

3. Run the Angular application:

    ng serve

   The frontend will be accessible at `http://localhost:4200`.

## Configuration

### Backend

- Database Configuration: Update the `application.properties` file with your database connection details.

### Frontend

- API URL: Update the `environment.ts` file with the correct backend API URL.

## Usage

1. Open your web browser and navigate to `http://localhost:4200`.
2. Use the login/signup functionality to authenticate.
3. Explore and perform CRUD operations on customer data.

## Contributors

- Prathamesh Surve (@PrathameshSurve)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
