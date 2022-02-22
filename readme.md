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

---

## Remove images

> docker image rm [image name]
> docker image rm [image name] -f

## force stop all running containers

> docker rm -f $(docker ps -aq)

## Show all containers (running and non-running)

> docker ps -a

---

## Start existing image

> docker start [docker image name or container id]

## Setting ENV in Dockerfile

> ENV PORT=8080
> ENV NODE_ENV=production or ENV NODE_ENV=production

## Create a volume

> docker volume create [name of volume directory]
> docker volume create shared-stuff

---

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

---

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

---

## Docker compose up to start all containers in docker compose

> docker-compose up

## Docker compose down to stop all containers in docker compose

> docker-compose down

## Base Image Addition

> FROM node:14-alpine AS development

## share volumes between containers

> docker run --name [new container name] --volumes-from [container to copy from] -d -p [host port]:[container port] nginx

## install react and redux

> npx create-react-app frontend --template redux

---

## Caching in Docker

> instead of

```javascript
FROM node:17-alpine
WORKDIR /backend
COPY . .
RUN npm install
EXPOSE 5000
CMD ["node", "backend/server.js"]
```

> Layer Caching

```javascript
FROM node:17-alpine
WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "backend/server.js"]
```

---

## Deleting containers

> docker container rm [container name or tag name]
> docker container rm [container name or tag name] -f

## Delete multiple container

> docker container rm [container name 1] [container name 2]

---

## Remove all containers and images and volumes

> docker system prune -a

## Then Build images

> docker build -t tester:v1 .

## Run the above image

> docker run --name new_c -p 5000:5000 tester:v1

---

Note: Docker start `starts` existing image while docker run create an entire new container off that image

## Volumes

Allows us to specify to specify folder on our host computer that are readily available to run containers, we can map the folder from machine to container folder

in your docker file install nodemon

```javascript
FROM node:17-alpine
RUN npm install -g nodemon
WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "backend/server.js"]
``
```

In your package.json file
add a script to run nodemon

```javascript
"dev-nodemon": "nodemon -L backend/server.js"
```

Before running

```javascript
FROM node:17-alpine
RUN npm install -g nodemon
WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev-nodemon"]
```

Then build the image:

> docker build -t nodemonapp:nodemon .

Run container off it

> docker run --name mynewapp_c -p 5000:5000 --rm nodemonapp:nodemon

The `--rm` removes the container

To map:
Stop container first: `docker stop mynewapp_c`

To start with volume with our local folder --> Right click to copy path of folder in vscode
`docker run --name mynewapp_c -p 5000:5000 --rm -v C:\Users\user\Desktop\travery\backend:/backend -v /backend/node_modules nodemonapp:nodemon`
