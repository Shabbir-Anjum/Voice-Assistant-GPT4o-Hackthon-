import { SignUp } from "@clerk/clerk-react";
import { urls } from "../router";

const Signup = () => {
  return (
    <div className="flex justify-center items-center w-screen">
      <SignUp
        path={urls.signUp}
        forceRedirectUrl={urls.menu}
        signInUrl={urls.login}
      />
    </div>
  );
};

export default Signup;
