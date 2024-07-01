const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: { type: String, required: true },
    discovery: { type: String, required: true },
    status: { type: String, enum: ['waiting', 'denied', 'accepted'] },
});

module.exports = mongoose.model('Company', companySchema);
