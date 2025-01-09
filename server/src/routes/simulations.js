const router = require('express').Router();
const Simulation = require('../models/Simulation');

// Get all simulations
router.get('/', async (req, res) => {
    try {
        const simulations = await Simulation.find();
        res.json(simulations);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Add new simulation
router.post('/', async (req, res) => {
    const newSimulation = new Simulation({
        parameters: req.body.parameters,
        statistics: req.body.statistics
    });

    try {
        const savedSimulation = await newSimulation.save();
        res.json(savedSimulation);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;