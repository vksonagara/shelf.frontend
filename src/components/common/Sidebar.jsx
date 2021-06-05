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
      style={{
        height: "100vh",
        position: "fixed",
        zIndex: "10",
      }}
      className="flex flex-col content-between sidebar-container"
    >
      <i
        className="bi bi-caret-right-square icon-28 collapse-icon"
        style={{
          position: "absolute",
          right: "-10px",
          color: "black",
          top: "40%",
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
        <AppLogo />
        <Menu />
      </div>
      <div className="d-flex justify-content-center border-top p-2">
        <div>
          <div id="div-basic" variant="light">
            {/* <img src="/images/person.svg" alt="" /> */}
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
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
