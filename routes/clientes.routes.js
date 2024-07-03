const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente.model');

// Crear un nuevo cliente
router.post('/clientes', async (req, res) => {
    const { nombre, email, telefono } = req.body;
    try {
        const cliente = await Cliente.create({ nombre, email, telefono });
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todos los clientes
router.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un cliente por su ID
router.get('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            res.status(404).json({ message: 'Cliente no encontrado' });
        } else {
            res.status(200).json(cliente);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un cliente por su ID
router.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    try {
        let cliente = await Cliente.findByPk(id);
        if (!cliente) {
            res.status(404).json({ message: 'Cliente no encontrado' });
        } else {
            cliente.nombre = nombre;
            cliente.email = email;
            cliente.telefono = telefono;
            await cliente.save();
            res.status(200).json(cliente);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un cliente por su ID
router.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            res.status(404).json({ message: 'Cliente no encontrado' });
        } else {
            await cliente.destroy();
            res.status(200).json({ message: 'Cliente eliminado correctamente' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
