let Config = require('../models/config');
const configController = {
  all (req, res) {
    // Returns config values
    Config.find({})
          .exec((err, configs) => res.json(configs))
  }
};
module.exports = configController;