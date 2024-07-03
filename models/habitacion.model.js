const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Habitacion = sequelize.define('Habitacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'disponible'
      }
    }, {
        tableName: 'habitaciones',
        timestamps: false
    });

module.exports = Habitacion;

