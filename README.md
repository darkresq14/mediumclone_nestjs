# Medium Clone Backend - NestJs

## Description

Backend for [RealWorld App](https://github.com/gothinkster/realworld) using the following [specs](https://www.realworld.how/specifications/backend/introduction/)

RealWorld is basically a clone of the popular website Medium.

I have also implemented a frontend for this project using Angular. This can be found [here](https://github.com/darkresq14/mediumclone_angular)

## Information

- configured to use absolute path using `module-alias`
- `TypeORM` with remote PostgreSQL DB on [neon.tech](https://neon.tech)
- Swagger using `@nestjs/swagger`
  - improved exceptions using [@nanogiants/nestjs-swagger-api-exception-decorator](https://github.com/nanogiants/nestjs-swagger-api-exception-decorator)
- Validation using [class-validator](https://github.com/typestack/class-validator)
- SWC(Speedy Web Compiler) builder instead of the standard TypeScript compiler
- Hashing passwords using `bcrypt`

## Running the app

- Create `ormconfig.template.ts` file using [ormconfig.template.ts](./src/ormconfig.template.ts)
- Create `config.ts` file using [config.template.ts](./src/config.template.ts)
- `pnpm install`
- `pnpm db:migrate`

```bash
# development
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
