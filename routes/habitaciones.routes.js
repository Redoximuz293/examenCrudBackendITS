const express = require('express');
const router = express.Router();
const Habitacion = require('../models/habitacion.model');

// Crear una nueva habitación
router.post('/habitaciones', async (req, res) => {
    const { numero, tipo, precio, estado } = req.body;
    try {
        const habitacion = await Habitacion.create({ numero, tipo, precio, estado });
        res.status(201).json(habitacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todas las habitaciones
router.get('/habitaciones', async (req, res) => {
    try {
        const habitaciones = await Habitacion.findAll();
        res.status(200).json(habitaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una habitación por su ID
router.get('/habitaciones/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            res.status(404).json({ message: 'Habitación no encontrada' });
        } else {
            res.status(200).json(habitacion);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar una habitación por su ID
router.put('/habitaciones/:id', async (req, res) => {
    const { id } = req.params;
    const { numero, tipo, precio, estado } = req.body;
    try {
        let habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            res.status(404).json({ message: 'Habitación no encontrada' });
        } else {
            habitacion.numero = numero;
            habitacion.tipo = tipo;
            habitacion.precio = precio;
            habitacion.estado = estado;
            await habitacion.save();
            res.status(200).json(habitacion);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar una habitación por su ID
router.delete('/habitaciones/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            res.status(404).json({ message: 'Habitación no encontrada' });
        } else {
            await habitacion.destroy();
            res.status(200).json({ message: 'Habitación eliminada correctamente' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.get('/habitaciones/disponibles', async (req, res) => {
    try {
        const habitacionesDisponibles = await Habitacion.findAll({
            where: {
                estado: 'disponible'
            }
        });

        if (habitacionesDisponibles.length > 0) {
            res.status(200).json({
                ok: true,
                data: habitacionesDisponibles,
                msg: "Habitaciones disponibles encontradas"
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: "No se encontraron habitaciones disponibles"
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

