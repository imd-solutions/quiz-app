"# docker-template"

# Run automatically

node runDockerApp.js

# Run manually

docker-compose --project-name quiz_app -f docker-compose.yml up --build      

(or if you want to detach the running process: Not show all the processing running in the terminal)

docker-compose --project-name quiz_app -f docker-compose.yml up --build -d

# Stop manually

docker-compose --project-name quiz_app -f docker-compose.yml down

# Set up backend

docker-compose --project-name quiz_app -f docker-compose.yml run --rm composer install --no-scripts --ignore-platform-reqs &&
docker-compose --project-name quiz_app -f docker-compose.yml run --rm artisan key:generate &&
docker-compose --project-name quiz_app -f docker-compose.yml run --rm artisan migrate:fresh

# Artisan

docker-compose --project-name quiz_app -f docker-compose.yml run --rm artisan -----

# Composer

docker-compose --project-name quiz_app -f docker-compose.yml run --rm composer ----- --no-scripts --ignore-platform-reqs

# PHPUnit Test

docker-compose --project-name quiz_app -f docker-compose.yml run --rm phpunit ----

# JEST Test

docker-compose --project-name quiz_app -f docker-compose.yml run --rm jest ----

# Restart docker

sudo service docker restart

# Clear out volumes

docker system prune --all --volumes -f

# Get the log information about a container/image

docker logs <id>

# SSH into docker container

docker exec -it <name> ash