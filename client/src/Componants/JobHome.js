import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobHome.css';
import toast, { Toaster } from 'react-hot-toast';

function JobHome() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // Array to track applied jobs with details
  const [selectedOption, setSelectedOption] = useState('jobPosts');
  const applicantId = localStorage.getItem('id'); // Replace this with the actual applicant ID
  const name = localStorage.getItem('name');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3002/api/admin/getAllJobsForUser');
        setJobs(response.data.jobs);
      } catch (error) {
        toast.error('Error fetching jobs');
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3002/api/user/myAppliedJobs/${applicantId}`);
        setAppliedJobs(response.data);
      } catch (error) {
        toast.error('Error fetching applied jobs');
      }
    };

    fetchJobs();
    fetchAppliedJobs();
  }, [applicantId]);

  const handleApply = async (jobId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:3002/api/user/apply/${jobId}`, { applicantId });
      if (response.status === 200) {
        setAppliedJobs((prev) => [...prev, { _id: jobId, status: 'Applied' }]);
        toast.success('Applied successfully');
      } else {
        toast.error(response.data.message || 'Error applying for job');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error applying for job');
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:3002/api/user/deleteAppliedJob/${applicantId}/${jobId}`);
      if (response.status === 200) {
        // Remove the job from the appliedJobs list
        setAppliedJobs((prev) => prev.filter((job) => job._id !== jobId));

        // Re-enable the apply button for this job in the jobs list
        setJobs((prevJobs) => 
          prevJobs.map((job) => 
            job._id === jobId ? { ...job, isApplied: false } : job
          )
        );

        toast.success('Job application removed successfully');
      } else {
        toast.error(response.data.message || 'Error deleting applied job');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting applied job');
    }
  };

  return (
    <div className="job-home-container">
      <nav className="vertical-navbar">
        <div
          style={{
            height: '100px',
            width: '100px',
            borderRadius: '50%',
            backgroundImage: 'URL(https://c0.wallpaperflare.com/preview/956/471/686/training-course-training-online-courses-learning.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            marginLeft: '45px',
          }}
        ></div>
        <h2>{name}</h2>
        <hr style={{ color: 'black', width: '200px' }} />
        <h2>Job Portal</h2>
        <button onClick={() => setSelectedOption('jobPosts')}>Job Posts</button>
        <button onClick={() => setSelectedOption('myAppliedJobs')}>My Applied Jobs</button>
      </nav>
      <div className="content">
        {selectedOption === 'jobPosts' && (
          <>
            <h1>Job Listings</h1>
            <ul>
              {jobs.map((job) => {
                const isApplied = appliedJobs.some((aj) => aj._id === job._id);
                return (
                  <li key={job._id} className="job-item">
                    <h2>{job.title}</h2>
                    <p>{job.position}</p>
                    <p>{job.company}</p>
                    <p>{job.requirements}</p>
                    <button
                      className={`apply-button ${isApplied ? 'applied' : ''}`}
                      onClick={() => handleApply(job._id)}
                      disabled={isApplied} // Disable button if already applied
                    >
                      {isApplied ? 'Applied' : 'Apply for this Job'}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {selectedOption === 'myAppliedJobs' && (
          <div>
            <h1>My Applied Jobs</h1>
            <ul>
              {appliedJobs.map((appliedJob) => {
                const job = jobs.find((job) => job._id === appliedJob._id);
                return job ? (
                  <li key={job._id} className="job-item">
                    <h2>{job.title}</h2>
                    <p>{job.position}</p>
                    <p>{job.company}</p>
                    <p>{job.requirements}</p>
                    <p>Status: {appliedJob.status}</p>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </button>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}
      </div>
      <Toaster /> {/* This will render toast notifications */}
    </div>
  );
}

export default JobHome;
