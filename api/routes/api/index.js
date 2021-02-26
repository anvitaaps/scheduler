var express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/appointments')
const slotController = require('../../controllers/slot')
const configController = require('../../controllers/config')
router.get('/appointments', appointmentController.all);
router.get('/retrieveSlots', slotController.all);
router.get('/retrieveSlotsByDate', slotController.getSlotForDate);
router.get('/getTimezones', configController.getTimezones);
router.post('/appointmentCreate', appointmentController.create);
router.post('/adminConfig', configController.postAdminConfig);
module.exports = router;