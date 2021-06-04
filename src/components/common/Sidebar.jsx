import Menus from "../../config/menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../../api/users";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/auth";

// Special Logo for only Sidebar
function Logo() {
  return (
    <div
      className="border-bottom d-flex justify-content-center"
      style={{
        width: "100%",
        cursor: "pointer",
      }}
    >
      <Link
        to="/"
        className="p-2 m-3 text-primary"
        style={{
          color: "black",
          fontWeight: "700",
          fontSize: "21px",
        }}
      >
        Shelf
      </Link>
    </div>
  );
}

// Menu Items for sidebar

function Menu() {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  function handleMenuClick(index) {
    setActiveMenuIndex(index);
  }

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {Menus.map((menu, index) => {
        return (
          <div
            placement="right"
            overlay={<div id={`div-right`}>{menu.title}</div>}
            key={index}
          >
            <Link to={`${menu.link}`}>
              <div
                className={`border-bottom d-flex justify-content-center icon-container  ${
                  activeMenuIndex == index ? "active-icon-container" : ""
                }`}
                style={{
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleMenuClick(index);
                }}
              >
                {menu.iconUrl ? (
                  <img src={menu.iconUrl} />
                ) : (
                  <i
                    className={`${menu.iconClass} ${
                      activeMenuIndex == index ? "active-icon" : ""
                    }`}
                  ></i>
                )}
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
      className="bg-light d-flex flex-column justify-content-between sidebar-container"
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
        <Logo />
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
