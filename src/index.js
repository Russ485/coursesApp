import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { CoursesContextProvider } from "./store/course-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CoursesContextProvider>
      <App />
    </CoursesContextProvider>
  </BrowserRouter>
);
