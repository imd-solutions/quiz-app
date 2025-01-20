"# docker-template"

# Run Development

docker-compose --project-name quiz_app -f docker-compose.yml up --build

(or if you want to detach the running process: Not show all the processing running in the terminal)

docker-compose --project-name quiz_app -f docker-compose.yml up --build -d

# Set up backend

docker-compose --project-name quiz_app -f docker-compose.yml run --rm composer install --no-scripts --ignore-platform-reqs &&
docker-compose --project-name quiz_app -f docker-compose.yml run --rm artisan key:generate &&
docker-compose --project-name quiz_app -f docker-compose.yml run --rm artisan migrate:fresh --seed &&
docker-compose --project-name quiz_app -f docker-compose.yml run --rm artisan passport:install &&
docker-compose --project-name quiz_app -f docker-compose.yml run --rm artisan passport:keys &&
docker-compose --project-name quiz_app -f docker-compose.yml run --rm artisan horizon:install &&
docker-compose --project-name quiz_app -f docker-compose.yml run --rm artisan telescope:install

# Run Staging

docker-compose --project-name quiz_app -f docker-compose-staging.yml up --build

# Run production

docker-compose --project-name quiz_app -f docker-compose.yml up --build

# Artisan

docker-compose --project-name quiz_app -f docker-compose.yml run --rm artisan -----

# Composer

docker-compose --project-name quiz_app -f docker-compose.yml run --rm composer ----- --no-scripts --ignore-platform-reqs

# NPM - Backend

docker-compose --project-name quiz_app -f docker-compose.yml run --rm nodepackage -----

# PHPUnit Test

docker-compose --project-name quiz_app -f docker-compose.yml run --rm phpunit ----

# Behat Test

docker-compose --project-name quiz_app -f docker-compose.yml run --rm behat ----

# JEST Test

docker-compose --project-name quiz_app -f docker-compose.yml run --rm jest ----

# Cypress Test

docker-compose --project-name quiz_app -f docker-compose.yml run --rm cypress
docker-compose --project-name quiz_app -f docker-compose.yml run --rm cypress_browser

# Cypress Browser Test

docker network ls - Get the network name

**_ MAC CONFIG _**
IP=$(ipconfig getifaddr en0)
/usr/X11/bin/xhost + $IP

**_ LINUX CONFIG _**
export DISPLAY=:0
xhost +si:localuser:root

docker run --network docker-nuxt-gol_laravel -it -v $PWD:/e2e -v /tmp/.X11-unix:/tmp/.X11-unix -w /e2e -e DISPLAY=$IP:0 --entrypoint cypress cypress/included:6.8.0 open --project .

# Remove a container/image

docker rm cypress_pmd && docker rm jest_pmd && docker rm npm_pmd && docker stop phpunit_pmd && docker rm phpunit_pmd && docker stop behat_pmd && docker rm behat_pmd && docker rm cypress_browser_pmd

# Restart docker

sudo service docker restart

# Clear out volumes

docker system prune -a --volumes

# Get the log information about a container/image

docker logs <id>

# SSH into docker container

docker exec -it <name> ash