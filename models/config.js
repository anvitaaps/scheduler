var mongoose = require('mongoose');
  const configSchema = new mongoose.Schema ({
    start_hours: {
        type: String
    },
    end_hours: {
        type: String
    },
    duration: {
        type: String
    },
    Timezone: {
        type: String
    },
  });
const Config = mongoose.model('Config', configSchema);
module.exports = Config;