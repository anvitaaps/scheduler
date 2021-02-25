var mongoose = require('mongoose');
  const slotSchema = new mongoose.Schema ({
    slot_time: {
        type: String
    },
    slot_date: {
        type: Number
    },
    created_at: Date
  });
const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;