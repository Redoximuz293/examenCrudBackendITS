const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const clientesRouter = require('./routes/clientes.routes');
const habitacionesRouter = require('./routes/habitaciones.routes');
const sequelize = require('./config/db');

dotenv.config();

const app = express();

// Middleware para permitir solicitudes desde cualquier origen
app.use(cors());

// Middleware para el registro de solicitudes HTTP
app.use(morgan('dev'));

// Middleware para manejar datos JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
    res.send('Esto es express y funciona el servidor');
});

// Rutas
app.use('/hotel', clientesRouter);
app.use('/hotel', habitacionesRouter);


// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Sincronización de modelos con la base de datos y arranque del servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch(error => console.log('Error al conectar con la base de datos:', error));
