const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        tableName: 'clientes',
        timestamps: false
    });
    

module.exports = Cliente;
