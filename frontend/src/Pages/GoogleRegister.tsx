import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Components/CustomButton";
import GoogleIcon from '@mui/icons-material/Google';

const GoogleRegister: React.FC = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    // navigate to /chat
    navigate("/chat");

    // Handle Google Sign-In logic here
    console.log("Google Sign-In clicked");
  };
  const handleGoogleFailure = (error: any) => {
    // Handle sign-in error here
    console.error("Google Sign-In error:", error);
  };
  const label = "Sign in with Google";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background-primary">
      <div className="p-8 bg-background-secondary text-Netral-100  shadow-md rounded-lg">
        
        
        <CustomButton
          label={label}
          onClick={handleGoogleSignIn}
          onError={handleGoogleFailure}
          icon={<GoogleIcon className="text-Netral-100" />}
          className="px-4 py-2 flex gap-2 rounded-lg  text-Netral-400  hover:bg-blue-600 hover:text-Netral-100"
        />
      
      </div>
    </div>
  );
};

export default GoogleRegister;
