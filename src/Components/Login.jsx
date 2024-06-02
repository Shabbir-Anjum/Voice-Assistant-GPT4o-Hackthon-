import { SignIn } from "@clerk/clerk-react";
import { urls } from "../router";

const Login = () => {
  return (
    <div className="flex justify-center items-center w-screen">
      <SignIn
        path={urls.login}
        signUpUrl={urls.signUp}
        forceRedirectUrl={urls.menu}
        routing="path"
      />
    </div>
  );
};

export default Login;
