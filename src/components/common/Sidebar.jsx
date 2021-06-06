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
                className={`flex justify-center icon-container w-full cursor-pointer p-4 border-t ${
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

// Sidebar Component
function Sidebar() {
  const dispatch = useDispatch();

  // state for option Menu
  const [isOptionVisible, setOptionVisible] = useState(false);
  return (
    <div
      className="flex flex-col sidebar-container h-screen
      fixed z-10 justify-between bg-gray-50"
    >
      {/* Icon for Collapsable folder-container and note-container */}
      <i
        className="bi bi-chevron-right absolute top-2/4  collapse-icon text-white bg-blue-600  text-sm h-8 w-8 flex justify-center items-center rounded-full"
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
        <Menu />
      </div>
      {/* User Option Component  */}
      <div className="flex justify-center border-t p-2">
        <div class="relative inline-block">
          <div>
            <button
              type="button"
              class="justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => {
                setOptionVisible(!isOptionVisible);
              }}
            >
              <i class="bi bi-person text-sm"></i>
              <i class="bi bi-chevron-up"></i>
            </button>
          </div>

          <div
            class={`absolute left-0 bottom-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
              !isOptionVisible && "hidden"
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <Link
                href="#"
                class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
              >
                Settings
              </Link>
              <Link
                href="#"
                class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300"
                role="menuitem"
                tabindex="-1"
                id="menu-item-1"
              >
                Profile
              </Link>
              <Link
                href="#"
                class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300"
                role="menuitem"
                tabindex="-1"
                id="menu-item-2"
              >
                Help
              </Link>
              <button
                class="text-gray-700 block w-full text-left px-4 py-2 text-sm focus:outline-none hover:bg-gray-300 border-t"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
