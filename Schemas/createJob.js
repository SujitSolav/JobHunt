const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

// Define a sub-schema for the applicants
const applicantSchema = new Schema({
  applicantId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
    required: true,
  }
}, { _id: false }); // _id: false ensures that Mongoose does not create an _id for this sub-schema

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true, 
  },
  company: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  applicants: [applicantSchema], // Use the sub-schema for applicants
}, { timestamps: true });

const createJob = mongoose.model('createJob', jobSchema);

module.exports = createJob;
