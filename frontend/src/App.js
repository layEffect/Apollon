import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Admin from "./components/Admin/Admin";
import Connection from "./components/Connection/Connection";
import Preloader from "./components/Preloader/Preloader";

function App() {
  return (
    <div className="app_wrapper">
      <Header />
      <div className="app_wrapper_content">
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<Main />} />
          <Route path="/connection/:tableName" element={<Connection />} />
          <Route path="/nhfycghfqv" element={<Admin />} />
          <Route path="/preloader" element={<Preloader />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
