// FindJobsPage.js
import React, { useEffect, useState } from 'react';
import JobCard from '../Elements/JobCard';
import Navbar from '../Navigation/Navbar';

const FindJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/jobs')
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load jobs');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
         <Navbar/>
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
         <Navbar/>
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Navbar/>
      <h1 className="text-3xl font-semibold text-center mb-8">Find Your Next Job</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="col-span-full text-center text-xl text-gray-600">
            No jobs available.
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJobsPage;
