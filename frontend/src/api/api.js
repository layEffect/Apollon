import axios from "axios";

const instance = axios.create({
  baseURL: "http://api/endpoints",
});

export const postData = (formData) => {
  return instance
    .post("/postData.php", formData)
    .then((response) => response.data);
};

export const updateData = (updateFormData) => {
  return instance
    .put("/updateData.php", updateFormData)
    .then((response) => response.data);
};

export const deleteData = (id, activeTab) => {
  return instance
    .delete("/deleteData.php", { params: { id, activeTab } })
    .then((response) => response.data);
};

export const fetchAllData = (activeTab) => {
  return instance
    .get("/fetchAllData.php", { params: { activeTab } })
    .then((response) => response.data);
};

export const uniqueSections = (activeTab) => {
  return instance
    .get("/uniqueSections.php", { params: { activeTab } })
    .then((response) => response.data);
};
