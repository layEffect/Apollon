import React, { useState } from "react";
import s from "./Admin.module.css";
import AdminTable from "./AdminTable/AdminTable";
import { tabsData } from "../../data/data";
import { postData } from "../../api/api";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("athletics");
  const [isFormVisible, setFormVisibility] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputs, setInputs] = useState({});
  const [tableKey, setTableKey] = useState(0);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormVisibility(false);
  };

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
    setSelectedImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { ...inputs, activeTab };

    postData(formData).then((data) => {
      // console.log(data);
      setTableKey((prevKey) => prevKey + 1);
    });

    setFormVisibility(false);
    setSelectedImage(null);
  };

  const handleChange = (e) => {
    const name = e.target.name;

    if (e.target.type === "file") {
      const imageFile = e.target.files?.[0];

      if (imageFile && imageFile.type?.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const base64String = event.target.result.split(",")[1];
          setInputs((values) => ({ ...values, [name]: base64String }));
        };

        reader.readAsDataURL(imageFile);
      } else {
        setSelectedImage(null);
      }
    } else {
      setInputs((values) => ({ ...values, [name]: e.target.value }));
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    setSelectedImage(
      selectedFile?.type?.startsWith("image/")
        ? URL.createObjectURL(selectedFile)
        : null
    );
  };

  return (
    <div className={s.scroll}>
      <div className={s.tabs}>
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            className={`${s.tab} ${activeTab === tab.id && s.active}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {tabsData.map(
        (tab) =>
          activeTab === tab.id && (
            <h1 key={tab.id} className={s.chapter}>
              {tab.label}:
            </h1>
          )
      )}

      <div className={s.formToggleBtnWrapper}>
        <button className={s.formToggleBtn} onClick={toggleFormVisibility}>
          {isFormVisible ? "Скасувати" : "Додати товар"}
        </button>
      </div>

      {isFormVisible && (
        <form className={s.formContainer} onSubmit={handleSubmit}>
          <label className={s.formLabel}>
            Section:
            <input
              className={s.formInput}
              type="text"
              name="section"
              onChange={handleChange}
              required
            />
          </label>
          <label className={s.formLabel}>
            Title:
            <input
              className={s.formInput}
              type="text"
              name="title"
              onChange={handleChange}
              required
            />
          </label>
          <label className={s.formLabel}>
            Description:
            <textarea
              className={`${s.formInput} ${s.formTextarea}`}
              name="description"
              onChange={handleChange}
              required
            />
          </label>
          <label className={s.formLabel}>
            Image:
            <input
              className={s.formInput}
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                handleImageChange(e);
                handleChange(e);
              }}
              required
            />
            <div className={s.imgContainer}>
              {selectedImage && <img src={selectedImage} className={s.selectedImage} alt="Selected" />}
            </div>
          </label>

          <button className={s.formButton} type="submit">
            Додати товар
          </button>
        </form>
      )}

      <AdminTable
        activeTab={activeTab}
        tableKey={tableKey}
        handleImageChange={handleImageChange}
        selectedImage={selectedImage}
        setTableKey={setTableKey}
      />

      <ScrollToTop/>
    </div>
  );
};

export default Admin;
