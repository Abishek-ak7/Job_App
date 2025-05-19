import React from "react";

const JobCard = ({ job }) => {
  if (!job || !job.header || !job.job || !job.overview) {
    return (
      <div className="border p-4 rounded-md shadow-md bg-red-100 text-red-700">
        Invalid job data
      </div>
    );
  }

  const { header, job: jobDetails, overview } = job;
  const {
    employer,
    locationName = "Location not specified",
    payPeriodAdjustedPay,
    jobViewUrl,
    rating = "N/A",
  } = header;
  const { jobTitleText = "Job title not available" } = jobDetails;
  const { industryName = "Industry not specified" } = overview.primaryIndustry || {};

  const payRange = payPeriodAdjustedPay
    ? `$${payPeriodAdjustedPay.p10} - $${payPeriodAdjustedPay.p90}`
    : "Salary not specified";

  const fullJobUrl = jobViewUrl ? `https://www.glassdoor.com${jobViewUrl}` : "#";

  return (
    <div className="border p-4 rounded-md shadow-md bg-white space-y-4">
      <div className="flex items-center space-x-4">
        {employer?.squareLogoUrl ? (
          <img
            src={employer.squareLogoUrl}
            alt={employer.name || "Company logo"}
            className="w-12 h-12 object-cover rounded-full"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
            N/A
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{jobTitleText}</h2>
          <p className="text-gray-600">{employer?.name || "Company name not available"}</p>
          <p className="text-gray-500 text-sm">{locationName}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-600">💰 Salary: {payRange}</p>
        <p className="text-gray-600">🏢 Industry: {industryName}</p>
        <p className="text-yellow-500 font-semibold">⭐ Rating: {rating}</p>
      </div>
      {jobViewUrl ? (
        <a
          href={fullJobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Apply Now
        </a>
      ) : (
        <p className="text-gray-500 italic">Application link not available</p>
      )}
    </div>
  );
};

export default JobCard;
