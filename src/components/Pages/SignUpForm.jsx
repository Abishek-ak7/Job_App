import SocialMediaButtons from './SocialMediaButtons';

const SignUpForm = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    const name = e.target.name.value;
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' '); // Join remaining parts for last name
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName, // Use firstName and lastName instead of name
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success, store user info or redirect
        console.log('Registration Successful:', data);
      } else {
        // Handle error
        console.error('Registration Failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl text-center mb-6">Create Account</h1>
      <SocialMediaButtons />
      <p className="text-center text-sm mb-4">Or use your email for registration</p>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <input
            id="signup-name"
            name="name"
            type="text"
            placeholder="Name"
            className="bg-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="Email"
            className="bg-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-6">
          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Password"
            className="bg-gray-300 p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white font-bold py-2 rounded-full hover:bg-red-600 transition duration-1000"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
