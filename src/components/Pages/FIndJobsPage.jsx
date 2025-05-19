import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../Elements/JobCard";
import Navbar from "../Navigation/Navbar";

const FindJobsPage = () => {
  // State variables
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
  });
  
  // List of company IDs to fetch from
  const companyIds = ["348371", "1167765", "9079", "7633", "3031"];
  
  const fetchJobsFromCompany = async (companyId) => {
    const options = {
      method: "GET",
      url: "https://glassdoor-real-time.p.rapidapi.com/companies/jobs",
      params: {
        companyId: companyId,
      },
      headers: {
        "x-rapidapi-key": "9519395695mshe12d09ac694588ap1a792cjsn4355fa56d505",
        "x-rapidapi-host": "glassdoor-real-time.p.rapidapi.com",
      },
    };
    
    try {
      const response = await axios.request(options);
      if (response.data && response.data.data && Array.isArray(response.data.data.jobListings)) {
        return response.data.data.jobListings;
      }
      return [];
    } catch (err) {
      console.error(`Error fetching jobs for company ${companyId}:`, err);
      return [];
    }
  };
  
  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      
      // Create an array of promises for fetching jobs from multiple companies
      const jobPromises = companyIds.map(id => fetchJobsFromCompany(id));
      
      // Wait for all promises to resolve
      const jobsFromAllCompanies = await Promise.all(jobPromises);
      
      // Flatten the array of job arrays into a single array
      const allJobs = jobsFromAllCompanies.flat();
      
      // Add a unique id to each job for key purposes
      const jobsWithIds = allJobs.map((job, index) => ({
        ...job,
        uniqueId: `job-${index}`
      }));
      
      setJobs(jobsWithIds);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch jobs. Please try again later.");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAllJobs();
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  
  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter((job) => {
    const jobView = job.jobview || {};
    const jobTitle = (jobView.jobTitle || "").toLowerCase();
    const companyName = (jobView.companyName || "").toLowerCase();
    const location = (jobView.location || "").toLowerCase();
    
    return (
      jobTitle.includes(filters.jobTitle.toLowerCase()) &&
      companyName.includes(filters.companyName.toLowerCase()) &&
      location.includes(filters.location.toLowerCase())
    );
  });
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      jobTitle: "",
      companyName: "",
      location: "",
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading jobs...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-red-500">{error}</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center mb-8">Find Your Next Job</h1>
        
        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-medium mb-4">Filter Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={filters.jobTitle}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Search by job title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                name="companyName"
                value={filters.companyName}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Search by company"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Search by location"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* Results summary */}
        <div className="mb-6">
          <p className="text-gray-700">
            Showing {filteredJobs.length} jobs out of {jobs.length} total
          </p>
        </div>
        
        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.uniqueId} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <JobCard job={job.jobview} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No matching jobs found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJobsPage;
