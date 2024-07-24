server-restart: down start

down:
	docker compose down --remove-orphans

start:
	docker compose up -d

docker-build:
	docker compose build --pull

docker-pull:
	docker compose pull

docker-down-clear:
	docker compose down -v --remove-orphans

install:
	docker compose run --rm wacari-frontend-node  npm install

build:
	docker compose run --rm wacari-frontend-node  npm run build -f
