let Slot = require('../models/slot');
const slotController = {
  all (req, res) {
    // Returns all Slots
      Slot.find({})
          .exec((err, slots) => res.json(slots))
  },
  addMinutes(time, minutes) {
    var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
    var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
      ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
      ((date.getSeconds().toString().length == 1) ? '0' + date.getSeconds() : date.getSeconds());
    return tempTime;
  },
  async getSlotForDate(req, res) {
    
    const { query } = req;
    
    // const data = await AdminConfig.find({})
    var starttime = "10:00:00";
    var interval = "30";
    var endtime = "17:00:00";
    var timeslots = [];

    let bookedSlots = await Slot.find({"slot_date": query.selectedDate})
    console.log('request: ', query.selectedDate, bookedSlots);

    while (starttime != endtime) {
      starttime = slotController.addMinutes(starttime, interval);
      if (bookedSlots.some(slot => slot.slot_time == starttime)) {
        await timeslots.push({time: starttime, booked: true});
      }
      else {
        await timeslots.push({time: starttime, booked: false});
      }
    }
    // console.log(timeslots)
    return res.json({ error: false, data: timeslots })
  }
};
module.exports = slotController;