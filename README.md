# Notification Sender

This project is intended to send notifications to users, We can create as many number of users as we want & send them emails with their email addresses.

## Documentation

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerequisite

[Node JS v16.17.0](https://nodejs.org/en/download)

## Installation

```bash
$ npm install
```

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

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Project Structure

```
.
├── LICENSE
├── README.md
├── example.env
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.authguard.ts
│   │   └── jwt.strategy.ts
│   ├── common
│   │   ├── logger.ts
│   │   └── swagger.ts
│   ├── config
│   │   └── configuration.ts
│   ├── constants
│   │   └── response.message.ts
│   ├── health
│   │   └── health.controller.ts
│   ├── main.ts
│   ├── mongodb
│   │   └── database.module.ts
│   ├── notification
│   │   ├── dto
│   │   │   └── notification.dto.ts
│   │   ├── notification.controller.spec.ts
│   │   ├── notification.controller.ts
│   │   ├── notification.module.ts
│   │   ├── notification.service.ts
│   │   └── schema
│   │       └── notification.schema.ts
│   ├── user
│   │   ├── dto
│   │   │   └── user.dto.ts
│   │   ├── schema
│   │   │   └── user.schema.ts
│   │   ├── user.controller.spec.ts
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   └── user.service.ts
│   └── utils
│       └── common.utils.ts
├── swagger-spec.json
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

## Authors

- [@iamjayantchauhan](https://github.com/iamjayantchauhan)

## License

[MIT](https://choosealicense.com/licenses/mit/)
