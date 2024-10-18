import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout.js";
import Clock from "./clock.js";
import Timer from "./timer.js";
import Stopwatch from "./stopwatch.js";
import Cursor from "./cursor.js";
import "./styles/index.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Clock />}/>
            <Route path="/timer" element={<Timer />}/>
            <Route path="/stopwatch" element={<Stopwatch />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <Cursor />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
