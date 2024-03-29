import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./interceptors/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UsersProvider } from "./context/UserContext";
import { PostsProvider } from "./context/PostContext";
import { LooksProvider } from "./context/LookContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsersProvider>
      <LooksProvider>
        <PostsProvider>
          <Router>
            <App />
          </Router>
        </PostsProvider>
      </LooksProvider>
    </UsersProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
