import React, { useState } from "react";
import "./App.css";
import Book from "./components/Book.jsx";
import axios from "axios";
import Form from "./components/Form.jsx";

function App() {

  const API_BASE_URL = "https://schang.pythonanywhere.com";
  axios.defaults.baseURL = API_BASE_URL;

  return (
    <div className="App">
      <h1>Sam y Saraí</h1>
      <div className="container">
          <Book />
      </div>
    </div>
  );
}

export default App;