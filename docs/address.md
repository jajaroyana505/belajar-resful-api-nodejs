# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Header :

- Authorization : token

Request Body :

```json
{
  "street": "jalan apa",
  "city": "kota apa",
  "province": "provinsi apa",
  "country": "negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "country": "negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Header :

- Authorization : token

Request Body :

```json
{
  "street": "jalan apa",
  "city": "kota apa",
  "province": "provinsi apa",
  "country": "negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "country": "negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressID

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "country": "negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/:contactId/addresses

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "jalan apa",
      "city": "kota apa",
      "province": "provinsi apa",
      "country": "negara apa",
      "postal_code": "Kode pos"
    },
    {
      "id": 2,
      "street": "jalan apa",
      "city": "kota apa",
      "province": "provinsi apa",
      "country": "negara apa",
      "postal_code": "Kode pos"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## Remove Address API

Endpoint : POST /api/contacts/:contactId/addresses/:addressId

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
