import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import Menus from "../../config/menu";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        className="p-2 m-1"
        style = {{
          color: "black"
        }}
      >
        <i className="bi bi-bootstrap-fill icon-32"></i>
      </Link>
    </div>
  );
}

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
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id={`tooltip-right`}>{menu.title}</Tooltip>}
          >
            <Link to = {`${menu.title}`}>
              <div
                className={`border-bottom d-flex justify-content-center icon-container  ${
                  activeMenuIndex == index ? "active-icon-container" : ""
                }`}
                style={{
                  width: "100%",
                  cursor: "pointer",
                }}
                key={index}
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
          </OverlayTrigger>
        );
      })}
    </div>
  );
}

function Sidebar() {
  return (
    <div
      style={{
        height: "100vh",
        maxWidth: "75px",
      }}
      className="bg-light d-flex flex-column justify-content-between"
    >
      <div>
        <Logo />
        <Menu />
      </div>
      <div className="d-flex justify-content-center border-top p-2">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" variant="light">
            {/* <img src="/images/person.svg" alt="" /> */}
            <i className="bi bi-person-circle icon-20"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Link to = "/setting">
            <Dropdown.Item eventKey="1" as = "div">
              Setting
            </Dropdown.Item>
            </Link>
            <Link to = "/profile">
            <Dropdown.Item eventKey="2" as = "div">
              Profile
            </Dropdown.Item>
            </Link>
           <Link to = "/help">
           <Dropdown.Item eventKey="3" as = "div">Help</Dropdown.Item>
           </Link>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}


export default Sidebar;
