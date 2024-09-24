import { useState } from "react";
import Login from "./Login";
import Signup from "./SignUp";

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-8 m-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-700">
            {hasAccount ? "Welcome Back!" : "Create a New Account"}
          </h2>
        </div>
        <div>
          {hasAccount ? <Login /> : <Signup />}
        </div>
        <div className="text-center mt-6">
          {hasAccount ? (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                className="text-blue-500 font-semibold hover:underline focus:outline-none"
                onClick={() => setHasAccount(false)}
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                className="text-blue-500 font-semibold hover:underline focus:outline-none"
                onClick={() => setHasAccount(true)}
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
