import SocialMediaButtons from './SocialMediaButtons';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  
  const navigate  =  useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/profile");
        // Handle success, store user info or redirect
        console.log('Login Successful:', data);
      } else {
        // Handle error
        console.error('Login Failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl text-center mb-6">Sign In</h1>
      <SocialMediaButtons />
      <p className="text-center text-sm mb-4">Or use your account</p>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="signin-email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="signin-email"
            name="email" // Add the name attribute to match with the form fields
            type="email"
            placeholder="Enter your email"
            className="bg-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="signin-password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="signin-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="bg-gray-300 p-2 w-full rounded"
          />
        </div>
        <p className="text-xs text-right mb-6">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </p>
        <button
          type="submit"
          className="w-full bg-red-500 text-white font-bold py-2 rounded-full hover:bg-red-600 transition duration-1000"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
