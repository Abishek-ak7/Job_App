import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Loader } from 'lucide-react';
import SocialMediaButtons from './SocialMediaButtons';

const SignInForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user was redirected with a message
  const urlParams = new URLSearchParams(window.location.search);
  const redirectMessage = urlParams.get('message');

  const validateForm = () => {
    let newErrors = {};
    const { email, password } = formData;

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store the JWT token
        localStorage.setItem('authToken', data.token);
        
        // Store user info
        if (data.user) {
          localStorage.setItem('userInfo', JSON.stringify({
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            phone: data.user.phone,
            location: data.user.location,
            profilePicture: data.user.profilePicture
          }));
        }
        
        setFormData({ email: '', password: '' });
        setErrors({});
        navigate('/profile'); // Redirect to dashboard
      } else {
        setErrors({ apiError: data.message || "Invalid email or password." });
      }
    } catch (error) {
      setErrors({ apiError: "Network error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  // Handle account actions messages
  const getMessageBanner = () => {
    if (redirectMessage === 'account-deleted') {
      return (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-md mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Your account has been successfully deleted.
        </div>
      );
    }
    if (redirectMessage === 'session-expired') {
      return (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Your session has expired. Please sign in again.
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="font-bold text-2xl text-center mb-6">Sign In</h1>
      
      {getMessageBanner()}
      
      {/* <SocialMediaButtons /> */}
      <p className="text-center text-sm mb-4">Or use your email to sign in</p>

      {errors.apiError && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {errors.apiError}
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="bg-gray-50 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="bg-gray-50 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className={`w-full font-bold py-2 rounded-full transition duration-300 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader className="w-5 h-5 mr-2 animate-spin" /> Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      

    </div>
  );
};

export default SignInForm;