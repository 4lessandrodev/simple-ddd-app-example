# A simple DDD-Application example

Example using `types-ddd` lib from [npm package](https://www.npmjs.com/package/types-ddd)

This is a simple example how to use `types-ddd` lib

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

Get `localhost:3000/users`
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

--- 

Post `localhost:3000/tasks`
> Create a task todo

```json

{
    "description":"new task todo",
    "ownerId": "6043b122-cc60-4f0e-8008-8fcd8089e687",
    "isDone": false
}

```

--- 

Put `localhost:3000/tasks/:taskId`
> Mark a task as done

```json

// Only param on url. PUT Method. 
// This method calls a hook by domain event

```

---

Get `localhost:3000/tasks`
> Get registered tasks

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
