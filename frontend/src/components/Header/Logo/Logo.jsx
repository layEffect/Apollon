import React from "react";
import s from "./Logo.module.css";
import logo from "../../../assets/images/loggo.png";
import { NavLink } from "react-router-dom";

const Logo = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.headerLogo} onClick={props.closeAllMenu}>
        <NavLink to="/main">
          <img src={logo} className={s.logo} alt="logo" />
        </NavLink>
      </div>
      <div className={s.menuIcon}>
        <input
          className={
            props.menuActive ? `${s.checkbox} ${s.active}` : s.checkbox
          }
          type="checkbox"
          onClick={() => {
            props.setMenuActive(!props.menuActive);
            props.setSubMenuActive(false);
          }}
        />
        <svg fill="none" viewBox="0 0 50 50" height="50" width="50">
          <path
            className={`${s.lineTop} ${s.line}`}
            strokeLinecap="round"
            strokeWidth="4"
            stroke="black"
            d="M6 11L44 11"
          ></path>
          <path
            strokeLinecap="round"
            strokeWidth="4"
            stroke="black"
            d="M6 24H43"
            className={`${s.lineMid} ${s.line}`}
          ></path>
          <path
            strokeLinecap="round"
            strokeWidth="4"
            stroke="black"
            d="M6 37H43"
            className={`${s.lineBottom} ${s.line}`}
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Logo;
