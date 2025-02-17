let Appointment = require('../models/appointments');
let Slot = require('../models/slot');
// const { Appointment, Slot } = Model;
const Nexmo = require("nexmo");
const appointmentController = {
 async all(req, res) {
    // Returns all appointments
    const appointments = await Appointment.aggregate(
      [
        {
          $lookup:
          {
            from: "slots",
            localField: "slots",
            foreignField: "_id",
            as: "slot"
          }
        }
      ]
    );
    return res.json({ error: false, data: appointments });
  },
  async create(req, res) {
    var requestBody = req.body;
    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    // newslot.save();
    let slot = await Slot.create(newslot)
    // Creates a new record from a submitted form
    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: newslot._id
    });
    newappointment.save(function(err,saveAppointment) {
      if(err){
        console.log(err);
        return;
      }
      res.json({  user: saveAppointment });
    });
  }
};
module.exports = appointmentController;