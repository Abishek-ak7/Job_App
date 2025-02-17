// JobCard.js
import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-semibold text-gray-800">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
      <div className="mt-4">
        <a
          href={`/job/${job.id}`}
          className="text-blue-600 hover:underline"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default JobCard;
