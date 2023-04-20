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

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `id`      | `string` | **Required**. Id of user to find |

#### Create user

```http
  POST /api/user/
```

| Body        | Type               | Description                                                 |
| :---------- | :----------------- | :---------------------------------------------------------- |
| `email`     | `string`           | **Required**. user email                                    |
| `nama_user` | `string`           | **Required**. user name                                     |
| `role`      | `enum \|\| string` | **Required**. user role, options: ADMIN, RECEPTIONIST, USER |
| `password`  | `string`           | **Required**. user password unique string character         |
| `foto`      | `file`             | **Required**. user profile picture                          |

#### Update user

```http
  PUT /api/user/:id
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. user id you wanna update |

| Body        | Type               | Description                                                 |
| :---------- | :----------------- | :---------------------------------------------------------- |
| `nama_user` | `string`           | **Optional**. user name                                     |
| `role`      | `enum \|\| string` | **Optional**. user role, options: ADMIN, RECEPTIONIST, USER |
| `password`  | `string`           | **Optional**. user password unique string character         |
| `foto`      | `file`             | **Optional**. user profile picture                          |

#### Delete user

```http
  DELETE /api/user/:id
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. user id you wanna delete |
