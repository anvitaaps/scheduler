let Slot = require('../models/slot');
let Config = require('../models/config');
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
    
    const data = await Config.find({})
    var starttime = await data[0]['start_hours'];
    var interval = await data[0]['duration'];
    var endtime = await data[0]['end_hours'];
    var timeslots = [{time: data[0]['start_hours'], booked: false}];

    let bookedSlots = await Slot.find({"slot_date": query.selectedDate})
    console.log('request: ', data[0]['start_hours'], data);

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