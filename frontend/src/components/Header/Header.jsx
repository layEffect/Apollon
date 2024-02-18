import React, { useState, useEffect } from "react";
import s from "./Header.module.css";
import Logo from "./Logo/Logo";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [subMenuActive, setSubMenuActive] = useState(false);

  const closeAllMenu = () => {
    setMenuActive(false);
    setSubMenuActive(false);
  };

  useEffect(() => {
    if (menuActive) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [menuActive]);
  
  return (
    <header>
      <Logo
        menuActive={menuActive}
        setMenuActive={setMenuActive}
        setSubMenuActive={setSubMenuActive}
        closeAllMenu={closeAllMenu}
      />
      <Navbar
        menuActive={menuActive}
        subMenuActive={subMenuActive}
        setMenuActive={setMenuActive}
        setSubMenuActive={setSubMenuActive}
        closeAllMenu={closeAllMenu}
      />
      {menuActive && <div className={s.blur} onClick={closeAllMenu}></div>}
    </header>
  );
};

export default Header;
