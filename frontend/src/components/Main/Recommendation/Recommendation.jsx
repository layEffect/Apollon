import React, { useEffect, useState } from "react";
import { recomItemData } from "../../../data/data";
import s from "./Recommendation.module.css";
import { useNavigate } from "react-router-dom";
import GridItem from "../../GridItem/GridItem";
import { setupWindowSizeListener } from "../../../windowSize";
import SwiperContainer from "../../SwiperContainer/SwiperContainer";

const Recommendation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setupWindowSizeListener(setIsMobile), []);

  const navigateToItem = (item) => {
    navigate(item.path, { state: { searchValue: item.title } });
  };

  return (
    <div className={s.recommendation}>
      <div className={s.sectionTitle}>
        <h2>Рекомендуємо для перегляду</h2>
        <h3>Товари, що користуються попитом у відвідувачів</h3>
      </div>
      {!isMobile ? (
        <div className={s.gridContainer}>
          {recomItemData.map((item, index) => (
            <GridItem item={item} key={index} func={navigateToItem} />
          ))}
        </div>
      ) : (
        <SwiperContainer items={recomItemData} func={navigateToItem} />
      )}
    </div>
  );
};

export default Recommendation;
