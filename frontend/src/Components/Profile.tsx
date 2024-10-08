import profile_icon from "../Assets/dummy profile.svg";
import { useNavigate } from "react-router-dom";



const Profile = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate("/profile");
  }
  return (
    <div className="flex gap-1 items-center cursor-pointer "  onClick={handleProfileClick}>
      <img
        src={profile_icon}
        alt="profile icon"
        height={5}
        width={25}
        className="rounded-full bg-secondary-200"
       
      />
      <h3 className="text-xl  text-Netral-300"> User </h3>
    </div>
  );
};

export default Profile;
