# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/)

# Docker

## Download the repository

1. Clone repository

```
git clone https://github.com/tsepulya/nodejs2021Q4-service.git
```

2. Go to folder 'nodejs2021Q4-service'

3. Change the branch to 'docker'

4. Install NPM modules

```
npm install
```

## Create docker image and run it

```
docker-compose up
```

## Usage of application

1. You can check a started application by using Postman or brouser

```
localhost:4000
```
2. Also you can make changes in src files - the application will automatically be updated

3. To stop application - enter Ctrl+C in terminal or enter

```
docker-compose stop
```

