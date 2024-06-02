import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Login from "../Components/Login.jsx";
import Menu from "../Pages/Menu.jsx";
import Profile from "../Pages/Profile.jsx";

// @ts-ignore
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Signup from "../Components/Signup.jsx";
import FileUpload from "../Pages/UploadDocs.jsx";
import VoiceAssistant from "../Pages/VoiceAssistant.jsx";
import ChatAssistant from "../Pages/ChatAssistant.jsx";
export const urls = {
  login: "/login",
  signUp: "/signup",
  menu: "/",
  profile: "/profile",
  FunctionSheet: "/FunctionSheet",
  VoiceAssistant: "/VoiceAssistant",
  ChatAssistant: "/ChatAssistant"
};

urls.verifyEmailAddress = `${urls.signUp}/verify-email-address`;
urls.loginFactorOne = `${urls.login}/factor-one`;
urls.resetPassword = `${urls.login}/reset-password`;
urls.resetPasswordSuccess = `${urls.login}/reset-password-success`;
urls.ssoCallback = `${urls.login}/sso-callback`;
const routes = [
  {
    element: <App />,
    children: [
      {
        path: urls.login,
        element: <Login />,
      },
      {
        path: urls.signUp,
        element: <Signup />,
      },
      {
        path: urls.verifyEmailAddress,
        element: <Signup />,
      },
      {
        path: urls.loginFactorOne,
        element: <Login />,
      },
      {
        path: urls.resetPassword,
        element: <Login />,
      },
      {
        path: urls.resetPasswordSuccess,
        element: <Login />,
      },
      {
        path: urls.ssoCallback,
        element: <Login />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: urls.menu,
            element: <Menu />,
          },
          {
            path: urls.profile,
            element: <Profile />,
          },
          {
            path: urls.FunctionSheet,
            element: <FileUpload />,
          },
          {
            path: urls.VoiceAssistant,
            element: <VoiceAssistant />,
          },
          {
            path: urls.ChatAssistant,
            element: <ChatAssistant />,
          }
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;