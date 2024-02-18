import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Footer.module.css";
import logo from "../../assets/images/loggo.png";
import instagram from "../../assets/images/footer_icons/instagram.png";
import facebook from "../../assets/images/footer_icons/facebook.png";
import telegram from "../../assets/images/footer_icons/telegram.png";
import email from "../../assets/images/footer_icons/email.png";
import youtube from "../../assets/images/footer_icons/youtube.png";

const Footer = () => {
  return (
    <footer>
      <div className={s.logoWrapper}>
        <NavLink to="/main">
          <img src={logo} className={s.logo} alt="logo"/>
        </NavLink>
      </div>
      <div className={s.social}>
        <a href="https://www.instagram.com/lay_effect/">
          <img src={instagram} alt="instagram"/>
        </a>
        <a href="#">
          <img src={facebook} alt="facebook"/>
        </a>
        <a href="#">
          <img src={telegram} alt="telegram"/>
        </a>
        <a href="#">
          <img src={email} alt="email"/>
        </a>
        <a href="#">
          <img src={youtube} alt="youtube"/>
        </a>
      </div>
      <p className={s.text}>© Created by lay_effect 2023</p>
    </footer>
  );
};

export default Footer;
