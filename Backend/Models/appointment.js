
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  worker: {
    type: Schema.Types.ObjectId,
    ref: 'Worker',
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  time:{
      type:String,
      required:true
  },
  status: {
    type: String,
    enum: ['Requested', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Requested',
  },
  serviceType: {
    type: String,
    
  },
  location: {
   type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);

 
