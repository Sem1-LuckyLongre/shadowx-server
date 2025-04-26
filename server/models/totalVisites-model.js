const mongoose = require('mongoose');

const totalVisitsSchema = new mongoose.Schema({
    totalVisits: {
        type: Number,
        required: true,
        default: 0
    }
});

const TotalVisits = mongoose.model('Totalvisits', totalVisitsSchema);
module.exports = TotalVisits;