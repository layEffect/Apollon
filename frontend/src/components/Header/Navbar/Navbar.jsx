import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import s from "./Navbar.module.css";
import { contactData } from "../../../data/data";

const Navbar = (props) => {
  const location = useLocation();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleNavLinkClick = (path) => {
    if (location.pathname === path) {
      console.log(location.state.searchValue);
      window.location.reload();
    } else {
      props.closeAllMenu();
    }
  };

  return (
    <nav className={props.menuActive ? `${s.menu} ${s.active}` : s.menu}>
      <ul className={s.navigation}>
        <li className={s["nav_li"]}>
          <NavLink
            to="/connection/athletics"
            className={s.linkButton}
            onClick={() => handleNavLinkClick("/connection/athletics")}
          >
            Легка атлетика
          </NavLink>
        </li>
        <li className={s["nav_li"]}>
          <NavLink
            to="/connection/weightlifting"
            className={s.linkButton}
            onClick={() => handleNavLinkClick("/connection/weightlifting")}
          >
            Важка атлетика
          </NavLink>
        </li>
        <li className={s["nav_li"]}>
          <NavLink
            to="/connection/tourism"
            className={s.linkButton}
            onClick={() => handleNavLinkClick("/connection/tourism")}
          >
            Туризм
          </NavLink>
        </li>
        <li className={s["nav_li"]}>
          <NavLink
            to="/connection/swimming"
            className={s.linkButton}
            onClick={() => handleNavLinkClick("/connection/swimming")}
          >
            Плавання
          </NavLink>
        </li>
        <li className={`${s["nav_li"]} ${props.subMenuActive ? s.active : ""}`}>
          <div
            className={s.linkButton}
            onClick={() => props.setSubMenuActive(!props.subMenuActive)}
          >
            Контакти{" "}
          </div>
          <ul className={s.sub_navigation}>
            {contactData.map((item, index) => (
              <li key={index} className={s["sub_nav_li"]}>
                {item.label}:{" "}
                <p
                  className={s["paragraph"]}
                  id="paragraph"
                  data-tooltip-variant="success"
                  onClick={() => copyToClipboard(item.value)}
                >
                  {item.value}
                </p>
                <Tooltip
                  style={{ zIndex: 3 }}
                  anchorSelect="#paragraph"
                  content="Скопировано"
                  openOnClick
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
