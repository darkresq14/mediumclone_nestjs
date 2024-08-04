## Description

Backend for [RealWorld App](https://github.com/gothinkster/realworld) using the following [specs](https://main--realworld-docs.netlify.app/docs/specs/backend-specs/introduction)

RealWorld is basically a clone of the popular website Medium.

I have also implemented a frontend for this project using Angular. This can be found [here](https://github.com/darkresq14/mediumclone_angular)

## Information

- configured to use absolute path using `module-alias`
- enabled watch using `nodemon`
- `TypeORM` with remote PostgreSQL db on `Supabase`

## Running the app

Create `ormconfig.template.ts` file using [ormconfig.template.ts](./src/ormconfig.template.ts)

```bash
# development
$ pnpm run start

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
