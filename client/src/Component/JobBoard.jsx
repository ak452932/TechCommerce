import React, { useEffect, useState } from 'react';
import '../CSS/JobBoard.css'; // Optional: custom styles

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/job")
      .then((res) => res.json())
      .then((data) => {
        const jobArray = Array.isArray(data) ? data : data.jobs;
        if (Array.isArray(jobArray)) {
          setJobs(jobArray);
        } else {
          console.warn("Unexpected data format:", data);
          setJobs([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setJobs([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center text-white bg-primary rounded py-3 mb-4 shadow-sm">
        Full-Time Jobs
      </h2>

      {loading ? (
        <div className="text-center fs-5">Loading jobs...</div>
      ) : Array.isArray(jobs) && jobs.length === 0 ? (
        <div className="text-center text-muted">No jobs found at the moment.</div>
      ) : Array.isArray(jobs) ? (
        <div className="row">
          {jobs.map((job, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card h-100 job-card border-primary shadow-sm">
                <div className="card-body bg-light">
                  <h5 className="card-title text-primary">{job.title}</h5>
                  <h6 className="card-subtitle text-muted mb-2">{job.company}</h6>
                  <p className="card-text">{job.summary}</p>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <small className="text-muted">
                    {job.location} | {job.type}
                  </small>
                  <br />
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm mt-2"
                  >
                    View Job
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-danger text-center">
          Something went wrong. Please try again later.
        </div>
      )}
    </div>
  );
}

export default JobBoard;