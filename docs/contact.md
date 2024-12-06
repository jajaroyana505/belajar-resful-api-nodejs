# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Header :

- Authorization : token

Request Body :

```json
{
  "first_name": "Muhammad Jaja",
  "last_name": "Royana",
  "email": "jajaroyana@example.com",
  "phone": "081389931321"
}
```

Request Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad Jaja",
    "last_name": "Royana",
    "email": "jajaroyana@example.com",
    "phone": "081389931321"
  }
}
```

Request Body Error :

```json
{
  "errors": "email isn't valid"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Header :

- Authorization : token
  Request Body :

```json
{
  "first_name": "Muhammad Jaja",
  "last_name": "Royana",
  "email": "jajaroyana@example.com",
  "phone": "081389931321"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad Jaja",
    "last_name": "Royana",
    "email": "jajaroyana@example.com",
    "phone": "081389931321"
  }
}
```

Response Body Error :

```json
{
  "errors": "email isn't valid"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad Jaja",
    "last_name": "Royana",
    "email": "jajaroyana@example.com",
    "phone": "081389931321"
  }
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Header :

- Authorization : token

Query params :

- name : Search by first_name or last_name, using like query, optional
- email : Search by email, using like query, optional
- phone : Search by phone, using like query, optional
- page : Number of page, default 1
- size : Size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Muhammad Jaja",
      "last_name": "Royana",
      "email": "jajaroyana@example.com",
      "phone": "081388888555"
    },
    {
      "id": 2,
      "first_name": "Jaja Muhammad",
      "last_name": "Royana",
      "email": "royana@example.com",
      "phone": "08179080055"
    }
  ],
  "pagging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Remove Contact API

Endpoint : DELETE /api/contacts

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
