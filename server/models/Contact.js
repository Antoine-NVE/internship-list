const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    object: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: false },
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Contact', contactSchema);
