const mongoose = require("mongoose");
const User = require("../Schemas/UserShema");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const middleware = require("../middleWare/middleware");
const Job = require("../Schemas/JobAppliaction");
const Admin = require("../Schemas/adminSchema");
const createJob=require('../Schemas/createJob')

router.post("/sample", (req, res) => {
  res.send("working");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);
    const adminExist = await Admin.findOne({ email });
    if (adminExist) {
      return res.send({ message: "Admin Alrady Exist", success: false });
    }
    let newAdmin = new Admin({ name, email, password: hashPassword });
    await newAdmin.save();
    res
      .status(200)
      .send({ messsage: "Admin Register SuccessFully", success: true });
  } catch (error) {
    res.status(500).send({ message: "Server Error", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email){
      return res.send({message:"Plz enter Email first", success:false})
    }
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.send({
        message: "Admin Does not Exists PLz Register First",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status({ message: "Wrong Password", success: false });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },"secret_key_123",{ expiresIn: "10h" }
    );
    res
      .status(200)
      .send({ message: " User Loged In succefully", success: true, token:token, email:user.email, name:user.name, id:user._id });
  } catch (error) {
    res.send({message:"Login Failed", success:false});
  }
});

router.post('/postjob/:id', async (req, res) => {
  try {
    const { title, position, company, requirements } = req.body;
    const createdBy = req.params.id; // Use a more descriptive variable name

    // Create a new job instance
    let newJob = new createJob({ title, position, company, requirements, createdBy });

    // Save the job to the database
    await newJob.save(); 

    // Send success response
    res.status(200).send({ message: "Job posted successfully", success: true });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({ message: "Failed to post job", success: false });
  }
});

router.get('/getAllJobs/:adminId', async (req, res) => {
  try {
    const { adminId } = req.params;
    const jobs = await createJob.find({ createdBy: adminId })
      .populate({
        path: 'applicants',
        select: 'name email' // Adjust fields based on what you need
      });

    res.status(200).send({ success: true , jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).send({ message: 'Failed to fetch jobs', success: false });
  }
}); 

router.get('/getJob/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await createJob.findById(jobId).populate('applicants', 'name email status'); // Adjust fields as needed
    
    if (!job) {
      return res.status(404).send({ success: false, message: 'Job not found' });
    }
    
    res.status(200).send({ success: true, job });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).send({ success: false, message: 'Failed to fetch job' });
  }
});

router.get('/getAllJobsForUser', async (req, res) => {
  try {
    const jobs = await createJob.find()
    res.status(200).send({ success: true, jobs });
  } catch (error) {
    console.error(error); 
    res.status(500).send({ message: "Failed to fetch jobs", success: false });
  }
});


router.get('/userAccordingToApplication/:userId', async (req, res)=>{
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})


router.put('/updateApplicantStatus', async(req, res)=>{
  const { jobId, applicantId, status } = req.body;

  try {
    // Find the job by ID and update the status of the specific applicant
    const job = await createJob.findOneAndUpdate(
      { _id: jobId, 'applicants.applicantId': applicantId },
      { $set: { 'applicants.$.status': status } },
      { new: true } 
    );

    if (!job) {
      return res.status(404).json({ message: 'Job or applicant not found' });
    }

    res.status(200).json({ message: 'Applicant status updated successfully', job });
  } catch (error) {
    console.error('Error updating applicant status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})


module.exports = router;
