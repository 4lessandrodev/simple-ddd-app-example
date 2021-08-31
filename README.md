# A simple DDD-Application example

Example using `types-ddd` lib from [npm package](https://www.npmjs.com/package/types-ddd)

This is a simple example how to use `types-ddd` lib

few free to use any frameworks like NestJS or any other.

---

## Objectives

- Show how to use `types-ddd` lib
- IUseCase: OK
- AggregateRoot: OK
- IMapper: OK
- ValueObject
- Entity

---

## How to run this app

Database is running in memory.

- Clone this repo
- `$ git clone [link]`
- Install dependencies
- `$ yarn install`
- Run application
- `$ yarn dev`


## Available end-points

---

Post `localhost:3000`
> Create an user

```json

{
    "email":"valid_email@domain.com",
    "password":"test123",
    "name":"John Stuart"
}

```

---

Get `localhost:3000`
> Get registered users

```json
[
    {
        "id": "6043b122-cc60-4f0e-8008-8fcd8089e687",
        "name": "John Stuart",
        "email": "valid_email@domain.com",
        "password": "$2b$10$9rZh7nnnW.WcoGYlt5T.s.YciLzju1j2yr1BITAs9wchTBndLOow2",
        "createdAt": "2021-08-31T14:48:24.920Z",
        "updatedAt": "2021-08-31T14:48:24.920Z"
    }
]
```
