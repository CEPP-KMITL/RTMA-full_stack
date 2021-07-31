REVERSE_PROXY := nginx
BACKEND := node-app
DATABASE := mongo
REDIS := redis
FRONTEND := quasar
SCRAPING := scraping-app
FILTER := filter
TWINT := twint

update-images:
	docker pull ghcr.io/me-dev-house/rtma-twint:latest
	docker pull ghcr.io/me-dev-house/rtma-node:latest
	docker pull ghcr.io/me-dev-house/rtma-filter:latest

up-backend:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -V $(REVERSE_PROXY) $(BACKEND) $(DATABASE) $(REDIS)

up-backend-fb:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate -V $(REVERSE_PROXY) $(BACKEND) $(DATABASE) $(REDIS)

up-frontend:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -V $(FRONTEND)
	
up-frontend-fb:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate -V $(FRONTEND)

up-scraping:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -V $(SCRAPING)

up-scraping-fb:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate -V $(SCRAPING)

up-filter:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -V $(FILTER)

up-filter-fb:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate -V $(FILTER)

up-twint:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -V $(TWINT)

up-twint-fb:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate -V $(TWINT)

up-backend-d:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build --force-recreate -V $(REVERSE_PROXY) $(BACKEND) $(DATABASE) $(REDIS)

up-frontend-d:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build --force-recreate -V $(FRONTEND)

up-scraping-d:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build --force-recreate -V $(SCRAPING)

up-filter-d:
	powershell docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build --force-recreate -V $(FILTER)

down:
	powershell docker-compose down -v

logs:
	powershell docker-compose logs -f

prune:
	powershell docker system prune

prune-all:
	powershell docker system prune -a

into-node-app:
	powershell docker-compose exec -it $(BACKEND) bash

into-mongo:
	powershell docker-compose exec -it $(DATABASE) bash

into-vue-app:
	powershell docker-compose exec -it $(FRONTEND) bash
