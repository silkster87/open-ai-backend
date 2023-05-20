# Nest JS backend for Open AI API Chrome extension

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository for a backend Open API for a Chrome extension that summarises user text selection. This backend makes use of the [OpenAI API](https://openai.com/blog/openai-api) to summarise the text and [MongoDB](https://www.mongodb.com/) to persist the summaries.

## Installation

```bash
$ npm install
```

## Environment Variables

Create a ``.env`` file in the root directory. Make three environment variables and fill in accordingly:

```env
OPENAI_API_KEY=
MONGODB_CONN_URI=mongodb://localhost/openai
MONGODB_TEST_CONN_URI=mongodb://localhost/openai-demo-test
```
Your ``OPENAI_API_KEY`` can be obtained from signing up to [OpenAI API](https://openai.com/blog/openai-api) and creating a Secret Key. The ``MONGODB_CONN_URI`` and ``MONGODB_TEST_CONN_URI`` are production and test URI's for MongoDB which are localhost by default for testing purposes.

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
