import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import s from "./Connection.module.css";
import { fetchAllData, uniqueSections } from "../../api/api";
import { pageData } from "../../data/data";
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import Search from "../Search/Search";
import GridItem from "../GridItem/GridItem";
import { setupWindowSizeListener } from "../../windowSize";
import SwiperContainer from "../SwiperContainer/SwiperContainer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const Connection = () => {
  const { tableName } = useParams();
  const location = useLocation();
  const [modalActive, setModalActive] = useState(false);
  const [sections, setSections] = useState([]);
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState({});
  const [item, setItem] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [value, setValue] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all([
          fetchAllData(tableName),
          uniqueSections(tableName),
        ]);
        setItems(data[0]);
        setSections(data[1]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setItems([]);
        setSections([]);
      }
    };

    fetchData();
  }, [tableName]);

  useEffect(() => {
    const visibleItemsCopy = {};
    items.forEach((item) => {
      if (!visibleItemsCopy[item.section]) {
        visibleItemsCopy[item.section] = [];
      }
      if (visibleItemsCopy[item.section].length < 8 || showMore) {
        visibleItemsCopy[item.section].push(item);
      }
    });
    setVisibleItems(visibleItemsCopy);
  }, [items, showMore]);

  useEffect(() => {
    setValue(location.state?.searchValue || "");
  }, [location]);

  useEffect(() => setupWindowSizeListener(setIsMobile), []);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(value.toLowerCase())
  );

  const modalActivation = (item) => {
    setItem(item);
    setModalActive(true);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={s.contentWrapper}>
      {pageData.map((pageData) => {
        if (pageData.id === tableName) {
          return (
            <div className={s.head} key={pageData.id}>
              <div className={s.titleContainer}>
                <span className={s.titleLine}></span>
                <h1 className={s.title}>{pageData.label}</h1>
              </div>
              {/* {!isMobile && (
                <p className={s.info}>
                  <i>{pageData.info}</i>
                </p>
              )} */}
              <p className={s.info}>
                  <i>{pageData.info}</i>
                </p>
            </div>
          );
        }
        return null;
      })}

      <Search value={value} setValue={setValue} />

      {value === "" ? (
        sections.length === 0 ? (
          <Preloader />
        ) : (
          sections.map((section) => {
            return (
              <div className={s.sectionContainer} key={section.section}>
                <h3 className={s.sectionName}>{section.section}</h3>
                {!isMobile ? (
                  <>
                    <div className="gridContainer">
                      {visibleItems[section.section]?.map((item, index) => (
                        <GridItem
                          item={item}
                          key={index}
                          base64={true}
                          func={modalActivation}
                        />
                      ))}
                    </div>
                    {items.filter((item) => item.section === section.section)
                      .length > 8 && (
                      <button
                        className={s.showMoreButton}
                        onClick={toggleShowMore}
                      >
                        {showMore ? "Показати менше" : "Показати більше"}
                      </button>
                    )}
                  </>
                ) : (
                  <div className={s.swiperWrapper}>
                    <SwiperContainer
                      items={items.filter(
                        (item) => item.section === section.section
                      )}
                      base64={true}
                      func={modalActivation}
                    />
                  </div>
                )}
              </div>
            );
          })
        )
      ) : filteredItems.length === 0 ? (
        <img src="https://i.gifer.com/yH.gif" className={s.gif} alt="Нічого не знайдено" />
      ) : !isMobile ? (
        <div className="gridContainer">
          {filteredItems.map((item, index) => (
            <GridItem
              item={item}
              key={index}
              base64={true}
              func={modalActivation}
            />
          ))}
        </div>
      ) : (
        <div className={s.swiperWrapper}>
          <SwiperContainer
            items={filteredItems}
            base64={true}
            func={modalActivation}
          />
        </div>
      )}

      <Modal
        modalActive={modalActive}
        setModalActive={setModalActive}
        item={item}
      />
      
      {!isMobile && <ScrollToTop />}
    </div>
  );
};

export default Connection;
