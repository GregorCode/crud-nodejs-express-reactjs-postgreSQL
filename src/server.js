import app from './app';
import { sequelize } from './config/database';
const port = process.env.port || 3000;

async function main() {
    try {
        await sequelize.authenticate();
        app.listen(port);
        console.log('Conexion establecida a la base exitosamente, servidor escuchando en el puerto:', port);
    } catch (error) {
        console.log('Entre en el catch del server.js:', error);
    }
}

main();