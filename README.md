# A simple DDD-Application example


## Simple application using `types-ddd` lib from [npm package](https://www.npmjs.com/package/types-ddd).

> Inspired in NestJS framework, but In this project no framework was used, to keep a clean architecture, but feel free to use any framework.

> Built to work with good performance.
---

## Objectives

> Show how to use [`types-ddd`](https://www.npmjs.com/package/types-ddd) lib

- IUseCase: OK
- AggregateRoot: OK
- IMapper: OK
- ValueObject: OK
- DomainEvents: OK
- IDomainEvent: OK
- IHandle: OK
- Hooks: OK
- Tests: OK
- Entity

---

## How to run this app

> Database is running in memory.

- Clone this repo
- `$ git clone https://github.com/4lessandrodev/simple-ddd-app-example.git`
- Install dependencies
- `$ yarn install` or `$ npm install`
- Run application
- `$ yarn dev` or `$ npm run dev`


## Available end-points

---

### Postman documentation

[Click to Postman Doc](https://documenter.getpostman.com/view/9702967/U16evoVq)

### POST `localhost:3000/users`
> Create an user

`Body`

```json

{
    "email":"valid_email@domain.com",
    "password":"test123",
    "name":"John Stuart"
}

```

---

### POST `localhost:3000/auth`
> Authenticate

`Body`

```json

{
    "email":"valid_email@domain.com",
    "password":"test123"
}

```

`Response Body`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.WQiOiI4ODAyYjhjOS1iMDljLTQ2M2MtYTI0OC1jODY5MTU0NmI5MW"
}
```

---

### GET `localhost:3000/auth`
> Get authenticated user

`Headers`

```json

{
    "authorization":"Bearer <token>"
}

```

`Response Body`

```json
{
    "id": "6043b122-cc60-4f0e-8008-8fcd8089e687",
    "name": "John Stuart",
    "email": "valid_email@domain.com",
    "password": "$2b$10$9rZh7nnnW.WcoGYlt5T.s.YciLzju1j2yr1BITAs9wchTBndLOow2",
    "createdAt": "2021-08-31T14:48:24.920Z",
    "updatedAt": "2021-08-31T14:48:24.920Z"
}
```

---

### GET `localhost:3000/users`
> Get registered users

`Headers`

```json
{ 
    "authorization":"Bearer <token>" 
}
```

`Response Body`

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

---

### POST `localhost:3000/tasks`
> Create a task todo

`Headers`

```json
{ 
    "authorization":"Bearer <token>" 
}
```

`Body`

```json

{
    "description":"new task todo",
    "isDone": false
}

```

--- 

### PUT `localhost:3000/tasks/:taskId`

> Mark a task as done

`Headers`

```json
{ 
    "authorization":"Bearer <token>" 
}
```

> Only param on url. PUT Method. This method calls a hook by domain event

---

### GET `localhost:3000/tasks`
> Get registered tasks

`Headers`

```json
{ 
    "authorization":"Bearer <token>" 
}
```

`Response Body`

```json
[
    {
        "id": "6043b122-cc60-4f0e-8008-8fcd8089e687",
        "description": "new task todo",
        "isDone": false,
        "ownerId": "a53989f0-3f55-4a66-997f-7fae4a57646b",
        "createdAt": "2021-09-01T01:06:30.435Z",
        "updatedAt": "2021-09-01T01:06:30.435Z"
    }
]
```
