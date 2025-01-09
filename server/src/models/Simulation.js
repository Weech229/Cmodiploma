const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const simulationSchema = new Schema({
    parameters: {
        servers: { type: Number, required: true },
        maxQueueLength: { type: Number, required: true },
        arrivalRate: { type: Number, required: true },
        serviceRate: { type: Number, required: true }
    },
    statistics: {
        totalCustomers: { type: Number, default: 0 },
        servedCustomers: { type: Number, default: 0 },
        rejectedCustomers: { type: Number, default: 0 },
        averageWaitTime: { type: Number, default: 0 },
        serverUtilization: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Simulation', simulationSchema);