import React,{ useState, useEffect }  from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user }= useSelector((state)=>state.auth);

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");


   useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} :${ampm}`);

      const options = { month: "short", day: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
   <>
   <header  className="absolute top-0 bg-white w-full py-4 px-6 left-0 shadow-md flex justify-between items-center z-50">
    {/* LEFT SIDE */}
    <div  className="flex items-center gap-3">
      <img src={userIcon} alt="userIcon" className="w-8 h-8" />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium lg:text-base">{user && user.role}</span>
          <span className="text-sm font-semibold lg:text-lg">{user && user.name}</span>
        </div>
    </div>
    {/* RIGHT SIDE */}
    <div  className="flex items-center gap-4">
     <div className="flex flex-col text-right">
          <span className="font-semibold text-sm lg:text-base">{currentTime}</span>
          <span className="text-sm text-gray-600">{currentDate}</span>
        </div>
        <div className="h-10 w-[2px] bg-black" />
        <img
          src={settingIcon}
          alt="settingIcon"
          className="w-8 h-8 cursor-pointer"
          onClick={() => dispatch(toggleSettingPopup())}
        />
    </div>
   </header>
  </>
  );
};

export default Header;
