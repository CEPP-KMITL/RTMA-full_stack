# Real Time Monitoring Accident and Casualty in Thailand (RTMC)

Data aggregation of news archive that allows user to historically search through the new and see the correlation with the location on the map for reference.

## Developer

- [@T-Pakorn](https://github.com/T-Pakorn)
- [@firstchnn](https://github.com/firstchnn)
- [@DearSmc](https://github.com/DearSmc)
- [@moondamon](https://github.com/moondamon)

## Dependency Note

Adds the third-party package to the package's development dependencies. It won't be installed when someone runs npm install directly to install your package.

```bash
  npm install ${package name} --save-dev
```

## Run Locally For Back-end Dev

Clone the project then go to the project directory (cd into RTMA-full_stack)

Start dev detach or with console (Use Windows PowerShell)

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build --force-recreate nginx node-app mongo redis
```

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate nginx node-app mongo redis
```

Stop dev

```bash
  docker-compose down -v
```

## Run Locally For Front-end Dev

Clone the project then go to the project directory (cd into RTMA-full_stack)

Start dev detach or with console (Use Windows PowerShell)

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build --force-recreate vue-ui
```

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate vue-ui
```

Stop dev

```bash
  docker-compose down -v
```

## Useful Commands

```bash
  // create and start containers
  docker-compose up
  // start services with detached mode
  docker-compose -d up
  // start specific service
  docker-compose up <service-name>
  // list images
  docker-compose images
  // list containers
  docker-compose ps
  // start service
  docker-compose start
  // stop services
  docker-compose stop
  // display running containers
  docker-compose top
  // kill services
  docker-compose kill
  // remove stopped containers
  docker-compose rm
  // stop all contaners and remove images, volumes
  docker-compose down
```

## Docker Documentation

Go to the project directory then build image command

```bash
  docker build -t rtma-api-image .
```

Run container command with read-only bind mount

```bash
  docker run -v ${pwd}:/app:ro -v /app/node_modules --env-file ./.env -p 8000:3000 -d --name rtma-api-app rtma-api-image
```

Run entire container

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate
```

Get in container

```bash
  docker exec -it ${container_name} bash
```

Get in mongo

```bash
  mongo -u "${username}" -p "${password}"
```

Show all mongo database

```bash
  show dbs
```

Select mongo database

```bash
  use ${database_name}
```
