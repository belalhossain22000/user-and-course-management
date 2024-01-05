# User and course management

## Description
## Live deployment link: https://user-and-course.vercel.app/
## Project documentation: https://documenter.getpostman.com/view/27386605/2s9YsDjEmP 
This project serves as an API demonstrating user authentication, course, review, and course category management functionality.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-belalhossain22000.git
   cd assignment-2
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a .env file in the root directory and add the following variables:

   ```bash
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

   Replace your_mongodb_connection_string with your actual MongoDB connection string.

## Usage

### Development

4.  Start the server in development mode:

        ```bash
        npm run start:dev
        ```

This command uses ts-node-dev to run the server with automatic reloading on file changes.

### Production

5. To build the TypeScript files and start the server in production mode:

   ```bash
   npm run build
   npm run start:prod
   ```

## Routes

### Register user

- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**: Provide details required for creating a user.
### Login user

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**: Provide details required for Login.
### Change password

- **Endpoint**: `/api/auth/change-password`
- **Method**: `POST`
- **Request Body**: Provide details required for change user password.
### Create a Course

- **Endpoint**: `/api/courses`
- **Method**: `POST`
- **Request Body**: Provide details required for creating a course.

### Get Paginated and Filtered Courses

- **Endpoint**: `/api/courses`
- **Method**: `GET`
- **Query Parameters**: Implement your own pagination and filtering logic.

### Create a Category

- **Endpoint**: `/api/categories`
- **Method**: `POST`
- **Request Body**: Provide details required for creating a category.

### Get All Categories

- **Endpoint**: `/api/categories`
- **Method**: `GET`

### Create a Review

- **Endpoint**: `/api/reviews`
- **Method**: `POST`
- **Request Body**: Provide details required for creating a review.

### Update a Course (Partial Update with Dynamic Update)

- **Endpoint**: `/api/courses/:courseId`
- **Method**: `PUT`
- **Params**: `courseId` - ID of the course to be updated.
- **Request Body**: Partial details to update the course dynamically.

### Get Course by ID with Reviews

- **Endpoint**: `/api/courses/:courseId/reviews`
- **Method**: `GET`
- **Params**: `courseId`- ID of the course to retrieve reviews for.

### Get the Best Course Based on Average Review (Rating)

- **Endpoint**: `/api/course/best`
- **Method**: `GET`

## Testing

1.Run linting:

```bash
npm run lint

```

2.Automatically fix linting issues:

```bash
npm run lint:fix
```

## Project Overview

### Backend Framework & Libraries

- **Express.js:**

  - A minimal and flexible Node.js web application framework used for building the API endpoints.
  - Used version: 4.18.2

- **Mongoose:**
  - An ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a straightforward schema-based solution to model the application data.
  - Used version: 8.0.1

### Database

- **MongoDB:**

  - A NoSQL database used to store application data.
  - Database interactions are managed via Mongoose.

### Development & Type Checking

- **TypeScript:**
  - A superset of JavaScript that adds static typing to the language, providing better tooling and error-checking capabilities during development.
  - Used version: 5.3.2

### Development Tools

- **ts-node-dev:**
  - A development tool used for running TypeScript applications in development mode with automatic restart and transpilation.
  - Used version: 2.0.0

### Code Quality & Style

- **ESLint:**

  - A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. It helps maintain code quality and consistency.
  - Used version: 8.54.0

- **Prettier:**
  - An opinionated code formatter that enforces consistent code style and formatting rules.
  - Used version: 3.1.0

### Typings & Type Definitions

- **@types/express:**

  - TypeScript type definitions for Express.js.
  - Used version: 4.17.21

- **@types/cors:**
  - TypeScript type definitions for CORS.
  - Used version: 2.8.17

### Dotenv

- **dotenv:**
  - A module that loads environment variables from a .env file into process.env.
  - Used version: 16.3.1

### Other

- **zod:**
  - A TypeScript-first schema declaration and validation library.
  - Used version: 3.22.4

## Overview Summary

This project utilizes Node.js with Express.js as the backend framework, MongoDB as the database, TypeScript for type safety and development enhancements, along with various other libraries and tools for security, middleware, code quality, and development workflow improvements.
