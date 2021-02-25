let Config = require('../models/config');
const configController = {
    async postAdminConfig(req, res) {
        const { query, body } = req;
        const data = await Config.create(body)
        return res.json({ error: false, message: 'Configuration Added Successfully', data: data })
    },

    async getAdminConfig(req, res) {
        const { query } = req;
        const data = await AdminConfig.find({})
        return res.json({ error: false, data: data[0] })
    }
};
module.exports = configController;