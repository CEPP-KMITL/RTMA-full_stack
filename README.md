# Real Time Monitoring Accident and Casualty in Thailand (RTMC)

Data aggregation of news archive that allows user to historically through the new and see the correlation with the location on the map for reference.

## Developer

- [@T-Pakorn](https://github.com/T-Pakorn)
- [@firstchnn](https://github.com/firstchnn)
- [@DearSmc](https://github.com/DearSmc)
- [@moondamon](https://github.com/moondamon)

## Run Locally For Dev

Clone the project then go to the project directory

Start dev detach or with console (Use Windows PowerShell)

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

Stop dev and delete all volume

```bash
  docker-compose down -v
```

## Docker Documentation

Go to the project directory

```bash
  cd RTMA-api
```

Build Image Command

```bash
  docker build -t rtma-api-image .
```

Run Container Command With Read-Only Bind Mount

```bash
  docker run -v ${pwd}:/app:ro -v /app/node_modules --env-file ./.env -p 3000:8080 -d --name rtma-api-app rtma-api-image
```
