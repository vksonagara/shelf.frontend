import Menus from "../../config/menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../../api/users";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/auth";
import AppLogo from "./AppLogo";

// Menu Items for sidebar

function Menu() {
  // active Menu Index State Managment
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  function handleMenuClick(index) {
    setActiveMenuIndex(index);
  }

  return (
    <div className="w-full">
      {/* Creating Menus with Config Files  */}
      {Menus.map((menu, index) => {
        return (
          <div key={index}>
            <Link to={`${menu.link}`}>
              <div
                className={`flex content-center icon-container w-full cursor-pointer ${
                  activeMenuIndex == index ? "active-icon-container" : ""
                }`}
                onClick={() => {
                  handleMenuClick(index);
                }}
              >
                <i
                  className={`${menu.iconClass} ${
                    activeMenuIndex == index ? "active-icon" : ""
                  }`}
                ></i>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

// Sidebar Componet
function Sidebar() {
  const dispatch = useDispatch();
  return (
    <div
      className="flex flex-col content-between sidebar-container h-screen
      fixed z-10"
    >
      {/* Icon for Collapsable folder-container and note-container */}
      <i
        className="bi bi-chevron-right absolute top-2/4  collapse-icon text-white bg-blue-600  text-sm p-2"
        style={{
          borderRadius: "50%",
          right: "-10px",
          display: "none",
        }}
        onClick={(e) => {
          document
            .querySelector(".notes-container")
            .classList.remove("animation");
          document
            .querySelector(".folder-container")
            .classList.remove("animation");
          document
            .querySelector(".content-container")
            .classList.remove("new-content-container");
          e.target.style.display = "none";
          document
            .querySelector(".demo-wrapper")
            .classList.remove("new-demo-wrapper");
        }}
      ></i>
      <div>
        {/* App Logo  */}
        <AppLogo />
        {/* Menu Component  */}
        <Menu />
      </div>
      <div className="flex content-center border-t p-2">
        {/* <div>
          <div id="div-basic" variant="light">
            <i className="bi bi-person-circle icon-20"></i>
          </div>
          <div>
            <Link to="/setting">
              <div eventKey="1" as="div">
                Setting
              </div>
            </Link>
            <Link to="/profile">
              <div eventKey="2" as="div">
                Profile
              </div>
            </Link>
            <Link to="/help">
              <div eventKey="3" as="div">
                Help
              </div>
            </Link>
            <div />
            <div
              eventKey="4"
              onClick={async () => {
                const { error } = await userApi.signout();
                if (!error) {
                  dispatch(signOut());
                }
              }}
            >
              Sign Out
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
