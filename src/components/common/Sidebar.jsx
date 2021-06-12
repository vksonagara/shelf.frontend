import Menus from "../../config/menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../../api/users";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/auth";
import AppLogo from "./AppLogo";
import { Menu } from "@headlessui/react";

// Menu Items for sidebar

function MenuItem() {
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
          <div key={index} className="relative">
            <Link
              to={`${menu.link}`}
              onClick={(e) => {
                e.preventDefault();
              }}
              className={`${index > 0 && "disabled: cursor-not-allowed"}`}
            >
              <div
                className={`flex justify-center icon-container w-full  p-4 border-t border-gray-500 ${
                  activeMenuIndex == index ? "active-icon-container" : ""
                }`}
                onClick={(e) => {
                  if (index < 1) {
                    handleMenuClick(index);
                  }
                }}
              >
                <i
                  className={`${menu.iconClass} text-white ${
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

// Sidebar Component
function Sidebar() {
  const dispatch = useDispatch();

  // state for option Menu
  const [isOptionVisible, setOptionVisible] = useState(false);
  return (
    <div
      className="flex flex-col sidebar-container h-screen
      fixed z-10 justify-between bg-secondary-dark"
    >
      {/* Icon for Collapsable folder-container and note-container */}
      <i
        className="bi bi-chevron-right absolute top-2/4   collapse-icon text-white bg-blue-600  text-sm h-8 w-8 flex justify-center items-center rounded-full cursor-pointer"
        style={{
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

      {/* Sidebar  */}
      <div>
        {/* App Logo  */}
        <AppLogo customStyle="block my-6 mx-3" width="90" height="90" />

        {/* Menu Component  */}
        <MenuItem />
      </div>

      {/* User Option Component  */}
      <div className="flex justify-center border-t p-2">
        <Menu>
          <Menu.Button className="justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
            <i className="bi bi-person-circle text-sm"></i>
          </Menu.Button>
          <Menu.Items className="absolute left-2 bottom-11 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
            {/* <Menu.Item>
              <Link
                to="/settings"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300"
              >
                Settings
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/profile"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300"
              >
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/help"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300"
              >
                Help
              </Link>
            </Menu.Item> */}
            <Menu.Item>
              <button
                className="text-gray-700 block w-full text-left px-4 py-2 text-sm focus:outline-none hover:bg-gray-300"
                role="menuitem"
                tabindex="-1"
                id="menu-item-3"
                onClick={async () => {
                  const { error } = await userApi.signout();
                  if (!error) {
                    dispatch(signOut());
                  }
                }}
              >
                Sign out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
}

export default Sidebar;
