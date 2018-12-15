npm init - endpoint: server-js - MIT

- instalación de express:

    npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator

    npm  i -D nodemon

- dependencia para leer ficheros .env
    npm i -S dotenv

    // uso:
    require('dotenv').config();   // lo mueve a las variables de entorno respectivas

    const config = {
        dev: process.env.NODE_ENV !=== 'production',
        port: process.env.PORT,
        dbUser: process.env.DB_USER,
        dbPassword : process.env.BD_PASSWORD,
        dbHost: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
        dbName: process.env.DB_NAME
    };


- Estructurando el proyecto con la configuración como punto de partida:


