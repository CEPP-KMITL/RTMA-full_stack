up-docker-backend:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate nginx node-app mongo redis

logs:
	docker-compose logs -f

into-node-app:
	docker-compose exec node-app bash

into-mongo:
	docker-compose exec mongo bash