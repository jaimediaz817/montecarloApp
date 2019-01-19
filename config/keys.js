/* TODO:
- ambiente de pruebas remoto
- ambiente de pruebas servidor ubuntu tradicional (virtual)
- ambiente de producción (VPS DO)
*/

if(process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod');
} else {
    module.exports = require('./keys_dev');
}