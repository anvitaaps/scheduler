let Config = require('../models/config');
var moment = require('moment-timezone');
var timeZones = moment.tz.names();
var offsetTmz=[];
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
    },

    async getTimezones(req, res) {
        for(var i in timeZones)
        {
            await offsetTmz.push(" (GMT"+moment.tz(timeZones[i]).format('Z')+") " + timeZones[i]);
        }
        return res.json({ error: false, data: offsetTmz })
    }
};
module.exports = configController;