import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardLayouts.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import ChatList from "../../components/ChatList/ChatList";
import Loader from "../../components/Loader/Loader";

const DashboardLayouts = () => {
  let { userId, isLoaded } = useAuth();

  const [openChatList, setOpenChatList] = useState(false)
  function handleSideBarClick() {
    setOpenChatList(!openChatList)
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return <Loader />

  return (
    <div className="dashboardLayout">
      <div className= "menu" >
          <ChatList/>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayouts;