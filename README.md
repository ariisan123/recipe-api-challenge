# GraphQL project

This project consist in a Recipe API.

- User SignUp and Login.
- JWT Authentication.
- Encrypted passwords.
- CRUD of Recipes.
- CRUD of Categories.

## Tools

- TypeScript
- NodeJS
- Express
- Type GraphQL
- Apollo Server
- BCRYPT
- JWT

## How to install

Open a terminal and clone the repo:

```
$ git clone https://github.com/ariisan123/recipe-api-challenge.git
```

After that, open the project with your IDE (VSCODE in my case) and edit the '.env' file with your MySQL config (or use the default config).

```
TYPEORM_HOST = MYSQL HOST (DEFAULT: localhost)
TYPEORM_USERNAME = MYSQL USER (DEFAULT: root)
TYPEORM_PASSWORD = MYSQL PASSWORD (DEFAULT: )
TYPEORM_DATABASE = MYSQL DATABASE NAME (DEFAULT: recipe_challenge)
TYPEORM_PORT = MYSQL PORT (DEFAULT: 3306)
SV_PORT= SERVER_PORT (DEFAULT: 3000)
SECRET= SECRET_FOR_JWT_AND_BCRYPT
```

Ok, now run these commands in the `/recipe-api-challenge` folder:

- `npm i` to install all dependencies.
- `npm createDB` to create the database.
- `npm start` to start the server.

And that's all! Now open the GraphQL Playground in your browser and test it!

> **NOTE** : You must be logged in to perform **queries** and **mutations** .<br/> Pass an HTTP Header like this:
>
> ```
> {"authorization": "Bearer YOUR_TOKEN"}
> ```
