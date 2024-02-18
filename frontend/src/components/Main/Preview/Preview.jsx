import React from "react";
import s from "./Preview.module.css";
import previewImg from "../../../assets/images/variantsOfPreview/PreviewImg5.png";
import arrow from "../../../assets/images/arrowDown.png";

const Preview = () => {
  const handleArrowClick = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={s.preview_wrapper}>
      <div className={s.previewImg_wrapper}>
        <img src={previewImg} className={s.PreviewImg} alt="preview"/>
      </div>
      <div className={s.arrow_wrapper} onClick={handleArrowClick}>
        <img src={arrow} className={s.arrow} alt="scrollArrow"/>
      </div>
    </div>
  );
};

export default Preview;
