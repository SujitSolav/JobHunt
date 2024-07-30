import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Add this line to set the root element for accessibility

function Admin() {
  const [jobs, setJobs] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeApplicants, setActiveApplicants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('applicants');
  const adminId = localStorage.getItem('id');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3002/api/admin/getAllJobs/${adminId}`);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Error fetching jobs');
      }
    };

    fetchJobs();
  }, [adminId]);

  const handleCreateJob = async (event) => {
    event.preventDefault();
    const { title, position, company, requirements } = event.target.elements;
    const jobData = {
      title: title.value,
      position: position.value,
      company: company.value,
      requirements: requirements.value,
    };

    try {
      const response = await axios.post(`http://127.0.0.1:3002/api/admin/postjob/${adminId}`, jobData);
      if (response.status === 200) {
        setJobs(prevJobs => [...prevJobs, response.data.job]);
        toast.success('Job posted successfully');
      } else {
        toast.error('Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error.response ? error.response.data : error.message);
      toast.error('Error posting job');
    }
  };

  const handleDropdownToggle = async (job) => {
    if (activeDropdown === job._id) {
      setActiveDropdown(null);
      setActiveApplicants([]);
      setIsModalOpen(false);
    } else {
      try {
        // Fetch the job details including the list of applicants
        const response = await axios.get(`http://127.0.0.1:3002/api/admin/getJob/${job._id}`);
        const applicants = response.data.job.applicants || [];
  
        // Fetch user details for each applicant
        const applicantDetails = await Promise.all(
          applicants.map(async (applicant) => {
            const userResponse = await axios.get(`http://127.0.0.1:3002/api/admin/userAccordingToApplication/${applicant.applicantId}`);
            return { ...userResponse.data, ...applicant };
          })
        );
  
        setActiveDropdown(job._id);
        setActiveApplicants(applicantDetails);
        setIsModalOpen(true); 
      } catch (error) {
        toast.error('Error fetching applicants');
      }
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setActiveDropdown(null);
    setActiveApplicants([]);
  };

  const handleActionChange = async (applicantId, status) => {
    const jobId = activeDropdown; // Assuming activeDropdown holds the job ID
  
    try {
      const response = await axios.put('http://127.0.0.1:3002/api/admin/updateApplicantStatus', {
        jobId,
        applicantId,
        status
      });
  
      if (response.status === 200) {
        toast.success('Applicant status updated successfully');
  
        // Optionally update the local state if needed
        setActiveApplicants((prevApplicants) =>
          prevApplicants.map((applicant) =>
            applicant._id === applicantId ? { ...applicant, status } : applicant
          )
        );
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    }
  };
  

  const name = localStorage.getItem('name');

  return (
    <div className="admin-container">
      <nav className="vertical-navbar">
        <div style={{ height: '100px', width: '100px', borderRadius: '50%', backgroundImage: 'URL(https://c0.wallpaperflare.com/preview/268/944/1012/advertise-twitter-account-marketing.jpg)', backgroundPosition: 'center', backgroundSize: 'cover', marginLeft: '45px' }}></div>
        <h2>{name}</h2>
        <hr style={{ color: 'black', width: '200px' }}></hr>
        <button onClick={() => setSelectedOption('applicants')}>Applicants on Job</button>
        <button onClick={() => setSelectedOption('create')}>Create Job</button>
      </nav>
      <main className="content">
        <h1>Admin Dashboard</h1>
        {selectedOption === 'applicants' && (
          <section>
            <h2>Job Listings with Applicants</h2>
            <ul>
              {jobs?.map((job) => (
                <li key={job?._id} className="job-item">
                  <h2>{job?.title}</h2>
                  <p>{job?.position}</p>
                  <p>{job?.company}</p>
                  <p>{job?.requirements}</p>
                  <button
                    className="applicants-dropdown-button"
                    onClick={() => handleDropdownToggle(job)}
                  >
                    Show Applicants
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
        {selectedOption === 'create' && (
          <section className='parent-container'>
            <form onSubmit={handleCreateJob} className='input-job'>
              <h2>Create Job</h2>
              <input type="text" name="title" placeholder="Job Title" required />
              <input type="text" name="position" placeholder="Position" required />
              <input type="text" name="company" placeholder="Company" required />
              <textarea name="requirements" placeholder="Requirements" required></textarea>
              <button type="submit">Create Job</button>
            </form>
          </section>
        )}
      </main>
      <Toaster />
      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Applicants Modal"
  className="modal"
  overlayClassName="overlay"
>
  <h2>Applicants</h2>
  {activeApplicants.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {activeApplicants.map((applicant, index) => (
          <tr key={applicant._id}>
            <td>{index + 1}</td>
            <td>{applicant.name}</td>
            <td><a href={`mailto:${applicant.email}`}>{applicant.email}</a></td>
            <td>
            <select
              onChange={(e) => handleActionChange(applicant._id, e.target.value)}
              defaultValue={applicant.status}
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No applicants</p>
  )}
  <button className="close-modal" onClick={closeModal}>Close</button>
</Modal>


    </div>
  );
}

export default Admin;
