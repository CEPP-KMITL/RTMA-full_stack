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

## Run Locally For Dev

Clone the project then go to the project directory

Start dev detach or with console (Use Windows PowerShell)

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -V
```

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V
```

Stop dev

```bash
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
