import React from "react";
import { FaGooglePlusG } from "react-icons/fa6";
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";

const SocialMediaButtons = () => (
  <div className="flex justify-evenly items-center mb-4">
    <button
      className="border-2 border-black p-2 rounded-full"
      aria-label="Sign in with Google"
      title="Sign in with Google"
    >
      <FaGooglePlusG size={20} />
    </button>
    <button
      className="border-2 border-black p-2 rounded-full"
      aria-label="Sign in with Facebook"
      title="Sign in with Facebook"
    >
      <TiSocialFacebook size={20} />
    </button>
    <button
      className="border-2 border-black p-2 rounded-full"
      aria-label="Sign in with LinkedIn"
      title="Sign in with LinkedIn"
    >
      <TiSocialLinkedin size={20} />
    </button>
  </div>
);

export default SocialMediaButtons;
