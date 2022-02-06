<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```
$ npm run test:auth
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


# Express
|                             |                                  |
|-----------------------------|----------------------------------|
| **Summary**                                                    |
| Test duration               | 40 sec                           |
| Virtual Users created       | 150                              |
| Virtual Users completed     | 150                              |
| **Scenario counts**                                            |
| 1                           | 82 (54.667%)                     |
| Test users route            | 68 (45.333%)                     |
| Errors                      | Test completed without           |
|                             |   network or OS errors.          |
| **Counters**                                                   |
| vusers.created_by_name.1    | 82                               |
| vusers.created              | 150                              |
| http.requests               | 410                              |
| http.codes.200              | 328                              |
| http.responses              | 410                              |

<img src="test-results/express-response-time.png" alt="express-response-time" width="50%"  height="50%">
<img src="test-results/express-session-length.png" alt="express-session-length" width="50%"  height="50%">


# Fastify
|                             |                                  |
|-----------------------------|----------------------------------|
| **Summary**                                                    |
| Test duration               | 30 sec                           |
| Virtual Users created       | 100                              |
| Virtual Users completed     | 100                              |
| **Scenario counts**                                            |
| 1                           | 46 (46%)                     |
| Test users route            | 54 (54%)                     |
| Errors                      | Test completed without           |
|                             |   network or OS errors.          |
| **Counters**                                                   |
| vusers.created_by_name.1    | 46                               |
| vusers.created              | 100                              |
| http.requests               | 230                              |
| http.codes.200              | 184                              |
| http.responses              | 230                              |

<img src="test-results/fastify-response-time.png" alt="fastify-response-time" width="50%"  height="50%">
<img src="test-results/fastify-session-length.png" alt="fastify-session-length" width="50%"  height="50%">

## Download the repository
1. Clone repository
```
git clone https://github.com/tsepulya/nodejs2021Q4-service.git
```
2. Go to folder 'nodejs2021Q4-service'

3. Change the branch to 'nest'

4. Install NPM modules

## Usage of app
1. You can run app by:
```
npm start
```
2. You can run by Docker:
```
docker-compose up
```

## Documentation of app
You can see full documentation about all entrypoints at the 'http://localhost:4000/doc' after running app