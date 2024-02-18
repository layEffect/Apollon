import React, { useEffect, useState } from "react";
import Preloader from "../../Preloader/Preloader";
import s from "./AdminTable.module.css";
import { deleteData, fetchAllData, updateData } from "../../../api/api";

const AdminTable = (props) => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editFileDataUrl, setEditFileDataUrl] = useState("");
  const [editFormData, setEditFormData] = useState({
    id: "",
    section: "",
    title: "",
    description: "",
    img: "",
  });
  const [showConfirmation, setShowConfirmation] = useState({
    toggle: false,
    id: "",
  });

  const getItems = () => {
    fetchAllData(props.activeTab)
      .then((data) => {
        // console.log(data);
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setItems([]);
      });
  };

  useEffect(() => {
    getItems();
  }, [props.activeTab, props.tableKey]);

  const handleChange = (e) => {
    const fieldName = e.target.name;

    if (e.target.type === "file") {
      const imageFile = e.target.files?.[0];

      if (imageFile && imageFile.type?.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const base64String = event.target.result.split(",")[1];
          setEditFormData((prevData) => ({
            ...prevData,
            [fieldName]: base64String,
          }));
        };

        reader.readAsDataURL(imageFile);
      } else {
        setEditFormData((prevData) => ({
          ...prevData,
          [fieldName]: null,
        }));
        setEditFileDataUrl(null);
      }
    } else {
      setEditFormData((prevData) => ({
        ...prevData,
        [fieldName]: e.target.value,
      }));
    }
  };

  const handleUpdateClick = (item) => {
    setEditItem(item);
    setEditFormData({
      id: item.id,
      section: item.section,
      title: item.title,
      description: item.description,
      img: item.img,
    });
    setEditFileDataUrl(`data:image/png;base64,${item.img}`);
  };

  const updateItem = () => {
    const updateFormData = { ...editFormData, activeTab: props.activeTab };

    updateData(updateFormData).then((data) => {
      // console.log(data);
      props.setTableKey((prevKey) => prevKey + 1);
    });

    setEditItem(null);
  };

  const deleteItem = (id) => {
    deleteData(id, props.activeTab).then((data) => {
      // console.log(data);
      getItems();
    });
  };

  return (
    <>
      {items.length === 0 ? (
        <Preloader />
      ) : (
        <table className={s.table}>
          <tbody>
            <tr className={s.tr}>
              <th className={s.th}>ID</th>
              <th className={s.th}>Section</th>
              <th className={s.th}>Title</th>
              <th className={s.th}>Description</th>
              <th className={s.th}>IMG</th>
              <th className={s.th} colSpan="2">
                Actions
              </th>
            </tr>
            {items
              .slice()
              .reverse()
              .map((item) => (
                <tr key={item.id} className={s.tr}>
                  <td className={s.td}>{item.id}</td>
                  <td className={s.td}>
                    {editItem && editItem.id === item.id ? (
                      <input
                        type="text"
                        name="section"
                        value={editFormData.section}
                        onChange={handleChange}
                      />
                    ) : (
                      item.section
                    )}
                  </td>
                  <td className={s.td}>
                    {editItem && editItem.id === item.id ? (
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleChange}
                      />
                    ) : (
                      item.title
                    )}
                  </td>
                  <td className={s.td}>
                    {editItem && editItem.id === item.id ? (
                      <textarea
                        className={`${s.formInput} ${s.formTextarea}`}
                        name="description"
                        value={editFormData.description}
                        onChange={handleChange}
                      />
                    ) : (
                      item.description
                    )}
                  </td>
                  <td className={s.td}>
                    {editItem && editItem.id === item.id ? (
                      <div className={s.imageInput}>
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => {
                            handleChange(e);
                            props.handleImageChange(e);
                          }}
                        />
                        {props.selectedImage ? (
                          <img
                            className={s.img}
                            src={props.selectedImage}
                            alt="Selected"
                          />
                        ) : (
                          <img
                            className={s.img}
                            src={editFileDataUrl}
                            alt="img"
                          />
                        )}
                      </div>
                    ) : (
                      <img
                        className={s.img}
                        src={`data:image/png;base64,${item.img}`}
                        alt="img"
                      />
                    )}
                  </td>
                  <td className={s.td}>
                    {editItem && editItem.id === item.id ? (
                      <button className={s.button} onClick={updateItem}>
                        Зберегти
                      </button>
                    ) : (
                      <button
                        className={s.button}
                        onClick={() => handleUpdateClick(item)}
                      >
                        Оновити дані
                      </button>
                    )}
                  </td>
                  <td className={s.td}>
                    {showConfirmation.toggle &&
                    showConfirmation.id === item.id ? (
                      <>
                        <p>Ви впевнені, що хочете видалити ці дані?</p>
                        <button
                          className={s.button}
                          onClick={() => deleteItem(item.id)}
                        >
                          Так
                        </button>
                        <button
                          className={s.button}
                          onClick={() =>
                            setShowConfirmation({ toggle: false, id: "" })
                          }
                        >
                          Ні
                        </button>
                      </>
                    ) : (
                      <button
                        className={s.button}
                        onClick={() =>
                          setShowConfirmation({ toggle: true, id: item.id })
                        }
                      >
                        Видалити дані
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AdminTable;
