import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import GridItem from "../GridItem/GridItem";
import "./SwiperContainer.module.css"

const SwiperContainer = (props) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
    >
      {props.items.map((item, index) => (
        <SwiperSlide key={index}>
          <GridItem item={item} base64={props.base64} func={props.func} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperContainer;
