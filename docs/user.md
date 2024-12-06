# User API Spec

## Registesr User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "mjr",
  "password": "rahasiabanger",
  "name": "Muhammad Jaja Royana"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "mjr",
    "name": "Muhammad Jaja Royana"
  }
}
```

Response Body Error :

```json
{
  "errors": "usename alredy exist"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "mjr",
  "password": "rahasiabanger"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "token-unique"
  }
}
```

Response Body Error :

```json
{
  "errors": "username or password is wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Header :

- Authorization : token

Request Body :

```json
{
  "name": "Jaja Royana", // optional
  "password": "rahasiabanger" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "name": "Jaja Royana",
    "password": "rahasiabanger"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name lenght max 100 caracter"
}
```

## Get User API

Endpoint : GET /api/users/current

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "Muhammad Jaja Royana",
    "name": "Jaja Royana"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": "Ok"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
