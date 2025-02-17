import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Domain from "../Elements/Domain";
import img1 from "../../assets/business.png";
import img2 from "../../assets/cybersecurity.png";
import img3 from "../../assets/web.png";
import img4 from "../../assets/Design.png";
import img5 from "../../assets/cusotmer_service.png";
import img6 from "../../assets/mobile-app.png";

const Explore = () => {
  const boxData = [
    { imgSrc: img1, heading: "Business Development", id: "1" },
    { imgSrc: img2, heading: "CyberSecurity", id: "2" },
    { imgSrc: img3, heading: "Web Development", id: "3" },
    { imgSrc: img4, heading: "UI/UX Design", id: "4" },
    { imgSrc: img5, heading: "Customer Service", id: "5" },
    { imgSrc: img6, heading: "Mobile App Development", id: "6" },
  ];

  return (
    <div className="flex flex-col justify-center items-center py-10 px-4 bg-gradient-to-b from-green-150 to-green-100">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-3xl md:text-5xl mb-4 text-charcoalGray">Explore by Category</h1>
        <p className="text-sm md:text-lg w-full sm:w-3/4 mx-auto text-gray-600">
          Discover curated content effortlessly with 'Explore by Category' navigation.
        </p>
        <h2 className="flex justify-center items-center font-bold text-base sm:text-xl mt-4 text-softGreen">
          See All Categories <FaArrowRightLong className="ml-2 text-softGreen" />
        </h2>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        {boxData.map((box) => (
          <Domain key={box.id} imgSrc={box.imgSrc} heading={box.heading} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
