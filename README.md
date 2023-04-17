## Description

A take home project build with Nest.js:
- Jwt auth strategy via passport-jwt
- Session auth strategy via passport-local, express-session, and Redis to store session data
- PostgreSQL to handle user data
- Swagger for API documentation and testings

The project has monorepo structure. The `auth-app` microservice in `apps` directory implements the functional described above.

I'd greatly appreciate any feedback you can provide.

## Installation

```bash
$ npm install
```

## Before running the app

Before running the app, launch the docker-compose:
```bash
$ docker-compose up -d
```

## Running the app

```bash
$ npm run start:dev auth-app
```

## Testing the app

Once the app is up and running, open the browser at the `localhost:3000/api`. The Swagger interface should be loaded.

### POST /login endpoint

In the `auth` section, access the `/login` endpoint by providing the user email and password in the body. The postgre db is already seeded with a few users. For example, you can use the following credentials:
```JSON
{
  "email": "test@test.test",
  "password": "password-test"
}
```

The response should provide an access token. Copy this token and open `Authorize` modal (green button at the top right corner on the same page). Paste the token.

### GET /users enpoint 

Now, the protected routes are avaible for you to play with. For example, you can try `/users` endpoint to get all the users from the database.

### POST /users endpoint

To register in the app, use `/user` enpoint and provide a body in the following format:
```JSON
{
  "name": "Andrei",
  "email": "andrei@yandex.test",
  "password": "qwerty123"
}
```

After that you can use the `/login` endpoint to get the access token for the protected routes. Note that the email should be of the correct format, otherwise the login function will throw an error.


## References

1. [Nest.js Official Documentation](https://docs.nestjs.com/)
2. [Passport.js Official Documentation](https://www.passportjs.org/docs/)
3. [An artical on prisma.io "Building a REST API with NestJS and Prisma"](https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0)
