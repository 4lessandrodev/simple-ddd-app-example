# A simple DDD-Application example

> It was built to work with good performance.

Example using `types-ddd` lib from [npm package](https://www.npmjs.com/package/types-ddd)

This is a simple example of using `types-ddd` lib.

few free to use any frameworks like NestJS or any other.

---

## Objectives

> Show how to use `types-ddd` lib

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

Database is running in memory.

- Clone this repo
- `$ git clone https://github.com/4lessandrodev/simple-ddd-app-example.git`
- Install dependencies
- `$ yarn install`
- Run application
- `$ yarn dev`


## Available end-points

---

### Postman documentation

[Postman Doc](https://documenter.getpostman.com/view/9702967/U16evoVq)

Post `localhost:3000/users`
> Create an user

```json

{
    "email":"valid_email@domain.com",
    "password":"test123",
    "name":"John Stuart"
}

```

---

Post `localhost:3000/auth`
> Authenticate

```json

{
    "email":"valid_email@domain.com",
    "password":"test123"
}

```

---

Get `localhost:3000/auth`
> Get authenticated user

`Headers`

```json

{
    "authorization":"Bearer <token>"
}

```

---

Get `localhost:3000/users`
> Get registered users

`Headers`
> `{ "authorization":"Bearer <token>" }`

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

Post `localhost:3000/tasks`
> Create a task todo

`Headers`
> `{ "authorization":"Bearer <token>" }`

```json

{
    "description":"new task todo",
    "isDone": false
}

```

--- 

Put `localhost:3000/tasks/:taskId`
> Mark a task as done

`Headers`
> `{ "authorization":"Bearer <token>" }`

```json

// Only param on url. PUT Method. 
// This method calls a hook by domain event

```

---

Get `localhost:3000/tasks`
> Get registered tasks

`Headers`
> `{ "authorization":"Bearer <token>" }`

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
