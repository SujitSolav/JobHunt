const mongoose = require("mongoose");
const User = require("../Schemas/UserShema");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const middleware = require("../middleWare/middleware");
const Job = require("../Schemas/JobAppliaction");
const multer = require("multer");
const createJob = require("../Schemas/createJob");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.send({ message: "User Alrady Exist", success: false });
    }
    let newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    res
      .status(200)
      .send({ messsage: "User Register SuccessFully", success: true });
  } catch (error) {
    res.status(500).send({ messsage: "Server Error", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.send({ message: "Plz enter Email first", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        message: "User Does not Exists PLz Register First",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status({ message: "Wrong Password", success: false });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      "secret_key_123",
      { expiresIn: "10h" }
    );
    res
      .status(200)
      .send({
        message: " User Loged In succefully",
        success: true,
        token: token,
        email: user.email,
        name: user.name,
        id: user._id,
      });
  } catch (error) {
    res.send({ message: "Login Failed", success: false });
  }
});

router.post("/apply/:jobId", async (req, res) => {
  const { jobId } = req.params;
  const { applicantId } = req.body; // Include status in the request body
  try {
    const job = await createJob.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const existingApplicant = job.applicants.find(
      (applicant) => applicant.applicantId.toString() === applicantId.toString()
    );

    if (existingApplicant) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    job.applicants.push({ applicantId }); // Add status here
    await job.save();

    res.status(200).json({ message: "Applied successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Error applying for job", error });
  }
});

router.get("/myAppliedJobs/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all jobs where the user is listed as an applicant
    const jobs = await createJob.find({ 'applicants.applicantId': userId });
    const userJobs = jobs.map(job => {
      const applicant = job.applicants.find(app => app.applicantId.toString() === userId);

      return {
        _id: job._id,
        title: job.title,
        position: job.position,
        company: job.company,
        requirements: job.requirements,
        status: applicant ? applicant.status : 'Pending' 
      };
    });

    res.status(200).json(userJobs);
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/deleteAppliedJob/:userId/:jobId', async (req, res) => {
  const { userId, jobId } = req.params;

  try {
    // const applicantObjectId = `new ObjectId('${applicantId}')`;
    const applicantObjectId = new mongoose.Types.ObjectId(userId);
    console.log(applicantObjectId);
    const job = await createJob.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' }); 
    }
    const applicantIndex = job.applicants.findIndex(applicant => applicant.applicantId = applicantObjectId);

    if (applicantIndex === -1) {
      return res.status(404).json({ message: 'Applicant not found in this job' });
    }
    job.applicants.splice(applicantIndex, 1);
    await job.save();

    res.status(200).json({ message: 'Applied job removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing applied job', error: error.message });
  }
});






const uploadFile = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cd) {
      cd(null, "Uploads");
    },
    filename: function (req, file, cd) {
      cd(null, file.filename + ".jpg");
    },
  }),
}).single("User_File");

router.post("/upload", uploadFile, (req, res) => {
  res.send("File Uploaded SuccessFully ");
});

module.exports = router;
