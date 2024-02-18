import React from "react";
import s from "./Modal.module.css";

const Modal = ({ modalActive, setModalActive, item }) => {
  return (
    <div
      className={
        modalActive ? `${s.modalContainer} ${s.active}` : `${s.modalContainer}`
      }
      onClick={() => setModalActive(false)}
    >
      <div
        className={modalActive ? `${s.modal} ${s.active}` : `${s.modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        {item && (
          <>
            <span
              className={s.closeButton}
              onClick={() => setModalActive(false)}
            >
              &times;
            </span>
            <div className={s.itemContainer}>
              <img
                src={`data:image/png;base64,${item.img}`}
                className={s.itemModalImage}
                alt="item"
              />
              <div className={s.contentContainer}>
                <h2 className={s.itemModalTitle}>{item.title}</h2>
                <p className={s.itemModalDescription}>{item.description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
