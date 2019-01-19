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

- Creación del fichero .gitignore en la raíz del proyecto,
- inicialización del repositorio


- MODELOS
    - se crea una carpeta en la raíz del proyecto "models"


- instalar gravatar 
npm i gravatar

- implementación ok en Routes folder


- JWT:


# CREANDO VALIDACIONES

    - se crea carpeta validation con register.js y login.js
    - Se aplican diferentes reglas de validación tanto en usuario como en login, incluyendo
    la validación del formato de email.

# CREANDO MODELO DE PERFIL
    - se crearon a su vez, array para contener objetos relativos a las experiencias    
    - se crearon a su vez, array para contener objetos relativos a los estudios realizados

# CREANDO MODELO DE POST



# CLIENTE    REACT
- página oficial (boilerplate):
github.com/facebook/create-react-app

- para instalar primero el boilerplate:
npm i -g create-react-app

- creando el cliente
create-react-app client

- Debajo de la llave "scripts" agregar lo siguiente para reducir la path a llamados de axios:
"proxy": "http://localhost:5000",

- Luego accedemos a client:
cd client && npm start

- Instalar luego un paquete concurrently para correr simultaneamente tanto servidor frontend como backend:
npm i concurrently

- ahora en el package.json del proyecto backend, agregar los scripts diferentes
en este bloque:

  "scripts": {
    "client-install": "npm install --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },

- Lo anterior con el fin de ejecutar simultáneamente el servidor y el cliente


CLIENTE

- Agregar bootstrap al proyecto
- Agregar las extensiones para Redux y React Dev Tools

- INSTALAR el complemento para VSCode:  ES7:  react/redux/graphQL

rfc   React Functional Component

rcc   React Container Component

- Se recicló código HTML embebido parcialmente en componentes funcionales (Footer)
y contenedores (Navbar y Layout)

# Router
- Instalar un enrutador de React
npm i react-router-dom

- Una vez descargado, volver a compilar servidor y cliente:
npm run dev + ENTER

- Se prueba exitosamente las rutas cargando los componentes adecuados

# Axios

- ahora instalaremos axios [COMANDO]:
npm i axios

- Se importa axios según el componente que se desea implementar alguna llamada a la API

# Classnames && FORMS

- Se instala esta dependencia para agregar logica en tags de componentes:
npm i classnames

- Para que NO valide el email, se agrega la directiva: "noValidate" en el nivel
de propiedades del form


---------------------

# REDUX
- Instalación de algunos paquetes a utilizar, ingresamos al proyecto client:
npm i redux react-redux redux-thunk 

# Decodificar info del token
- Para extraer info del usuario:
npm i jwt-decode











# Creando un nuevo reducer para el profile:
- 