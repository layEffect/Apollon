import React from "react";
import s from "./GridItem.module.css";

const GridItem = (props) => {
  const imageUrl = props.base64
    ? `data:image/png;base64,${props.item.img}`
    : props.item.img;

  return (
    <div className={s.gridItem} onClick={() => props.func(props.item)}>
      <img src={imageUrl} className={s.itemImage} alt="item" />
      <div className={s.itemTitle}>
        <p>{props.item.title}</p>
      </div>
    </div>
  );
};

export default GridItem;
