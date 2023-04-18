# BACKEND HOTELS

Backend server app, for hotels. Including user authentication and authorization. basic CRUD for users, room, types of room, order and details of orders.

## Installation

Install my-project with npm

```bash
  git clone https://github.com/MrNewbie3/backend-hotels.git
  cd my-project (root backend directory)
  npm install
```

## Running Application

Running my-project with npm

```bash
    create .env file    (including all items in .env.examples)
    npm run dev || nodemon server.js
```

## API Reference

### Users API

#### Get all users

```http
  GET /api/user
```

#### Get single user

```http
  GET /api/user/:id
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `id`      | `string` | **Required**. Id of user to find |

#### add(num1, num2)

Takes two numbers and returns the sum.
