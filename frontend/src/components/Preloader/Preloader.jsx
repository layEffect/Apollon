import React from "react";
import s from "./Preloader.module.css";

const Preloader = (props) => {
  return (
    <div className={s.loading_spinner}>
      <div className={s.square1}></div>
      <div className={s.square2}></div>
      <div className={s.square3}></div>
      <div className={s.square4}></div>
      <div className={s.square5}></div>
    </div>
  );
};

export default Preloader;
