# typescript-vue-crud-app

This example shows how to implement a Node.js Express web app using TypeScript REST API. The API enables users' to authentication and manipulations of objects from a MySQL database.

This example shows how to implement a simple Vue using TypeScript Web Application enables data written in the DB visualization using the implemented REST API.

# Launching the REST API

```shell
cd typescript-rest-api
```

## Set up the database and integrate seeds

```shell
cd db
docker compose up
```

## Run the app

```shell
npm install
npm run start
```

## Other commands

```shell
# Compiles and minifies for production
npm run build

# Format the code
npm run format

# Lints and fixes files
npm run lint
```

# Launching the application

```shell
cd typescript-vue-app
```

## Run the app

```shell
npm install
npm run serve
```

## Other commands

```shell
# Compiles and minifies for production
npm run build

# Lints and fixes files
npm run lint
```