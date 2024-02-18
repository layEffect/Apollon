import React from "react";
import Info from "./Info/Info";
import s from "./Main.module.css";
import Preview from "./Preview/Preview";
import Recommendation from "./Recommendation/Recommendation";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const Main = () => {
  return (
    <>
      <Preview />
      <Recommendation />
      <Info />
      <ScrollToTop/>
    </>
  );
};

export default Main;