## This is a simple nestjs template with authentication

- it provides you with an basic 0auth2 workflow
- it provides you with a simple jwt based authentication possibility

if you want to improve the template feel free to create some pull request!

## Description

## Installation

```bash
npm install

```

## Running the app

### Env file

```bash
cp .env.example .env
```

Enter a safe `JWT_SECRET` by generating one using this command: `openssl rand -base64 32`

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```