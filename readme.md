<!-- Run build -->
<!-- make sure the docker deamon is running -->

## Build docker

> docker build -t [give the docker image a name] .
> docker build -t yomiapp .

## List images [View local images]

> docker images

## Run image

docker run --name [give a new name] [image name]
e.g docker run --name yomiapp_clone yomiapp

## Result

```javascript
Server running on 5000
MongoDB Connected: godan-shard-00-00.minj6.mongodb.net
```

## Show a list of running container

> docker ps ps stands for processes

## stop a container

> docker stop [container name or id]

## mapping ports on container to localhost

> docker run --name docker_tut -p 6767:5000 -d yomiapp
> Result: `26f204968b71fca4b3e016e08e36b623404004ebf7081940c14a5731baf22385`

## force stop all running containers

> docker rm -f $(docker ps -aq)

## Show all containers (running and non-running)

> docker ps -a

## Start existing image

> docker start [docker image name or container id]

## Setting ENV in Dockerfile

> ENV PORT=8080
> ENV NODE_ENV=production or ENV NODE_ENV=production

## Create a volume

> docker volume create [name of volume directory]
> docker volume create shared-stuff

## List Volumes

> docker volume ls

## Inspect volume

> docker volume inspect [volume name]
> docker volume inspect shared-stuff

## Remove a volume

> docker volume rm [volume name]
> docker volume rm shared-stuff

## Mount volume

docker run \ --mount source=shared-stuff,target=/stuff

## docker compose file

> Create a docker-compose.yml file

In it:

```javascript
version: '3'
services:
    web:
        build: .
        ports:
            - "8080:8080"
    db:
        image: "mysql"
        environment:
            MYSQL_ROOT_PASSWORD: password
        volumes:
            - db-data:/foo

    volumes:
        db-data:

```

## Docker compose up to start all containers in docker compose

> docker-compose up

## Docker compose down to stop all containers in docker compose

> docker-compose down

## Base Image Addition

> FROM node:14-alpine AS development

## share volumes between containers

> docker run --name [new container name] --volumes-from [container to copy from] -d -p [host port]:[container port] nginx
