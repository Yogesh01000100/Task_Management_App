import { useState } from "react";
import Login from "./Login";
import Signup from "./SignUp";

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h2 className="text-2xl mb-4">
          {hasAccount ? "Login to Your Account" : "Create a New Account"}
        </h2>
        {hasAccount ? <Login /> : <Signup />}
        <div className="mt-4">
          {hasAccount ? (
            <p>
              Don`&apos;t have an account?{" "}
              <button
                className="text-blue-500"
                onClick={() => setHasAccount(false)}
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                className="text-blue-500"
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
