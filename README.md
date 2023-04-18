# BACKEND HOTELS
Backend server app, for hotels. Including user authentication and authorization. basic CRUD for users, room, types of room, order and details of orders. 

## Installation

Install my-project with npm

```bash
  cd my-project (root backend directory)
  npm install
  create .env files
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

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to find |

#### add(num1, num2)

Takes two numbers and returns the sum.

