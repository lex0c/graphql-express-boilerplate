## (Graphql + Expressjs) Boilerplate

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/lleocastro/encryptor/issues)

Starter for a flexible and scalable GraphQL server for Nodejs with Expressjs.

### Quickstart

1. **Clone this repository**

    `git clone https://github.com/lleocastro/graphql-express-boilerplate.git`
    
   ##### or use as template 
   [https://github.com/lleocastro/graphql-express-boilerplate/generate](https://github.com/lleocastro/graphql-express-boilerplate/generate)

2. **Install dependencies**

    `npm install`

3. **Run server**

   `npm start` or `npm run prod` or `docker-compose up`

   ###### Server should be running at http://localhost:4000/graphql
   
### Project Structure
```

├── /
|   ├── src/
|   |   ├── services/
|   |   |   ├── user/
|   |   |   |   ├── graphql.js
|   |   |   |   ├── controller.js
|   |   |   |   ├── loaders.js
|   |   |   |   └── index.js
|   |   |   └── index.js
|   |   ├── utils/
|   |   |   └── ...
|   |   ├── app.js
|   |   ├── base.js
|   |   ├── constants.js
|   |   ├── index.js
|   |   └── ...
|   ├── jobs/
|   |   └── ...
|   ├── scripts/
|   |   └── ...
|   └── tests/
|   |   └── ...
├── .eslintrc
├── .babelrc
├── .editorconfig
├── package.json
├── package-lock.json
├── nodemon.json
├── nginx.conf
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
└── .gitignore
```

### Scripts
- **npm start**

     Start nodemon dev server

- **npm run prod**

     Start server

- **npm run lint**

     Runs the linter

- **npm test**

     Runs unit tests
     
- **npm run orm**

     ORM super powers
     
### SECURITY

If you discover security related issues, please email leonardo_carvalho@outlook.com instead of using the issue tracker.


#### To contributions 

Please, see [doc for contribute](https://github.com/lleocastro/graphql-express-boilerplate/blob/master/CONTRIBUTE.md). Thanks!


#### License

This is licensed under the MIT license. See [License File](https://github.com/lleocastro/graphql-express-boilerplate/blob/master/LICENSE) for more information.
