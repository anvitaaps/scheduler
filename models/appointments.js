var mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    slots:{type: mongoose.Schema.Types.ObjectId, ref: 'Slot'},
    created_at: Date
  });
  const Appointment = mongoose.model('Appointment', appointmentSchema);
  module.exports = Appointment;