import { ConfigProvider, FloatButton } from "antd";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuComponent from "./components/MenuNavbar";
import { Home, Map } from "./pages";

import "./App.css";

function App() {
  const [current, setCurrent] = useState("home");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              horizontalItemHoverColor: "#75BF7A",
              horizontalItemSelectedColor: "#75BF7A",
            },
            Select: {
              multipleItemBorderColor: "#FFFFFF",
              selectorBg: "#75BF7A",
              optionSelectedColor: "#75BF7A",
              optionSelectedBg: "#f1f1f1",
              clearBg: "#75BF7A",
            },
            Button: {
              defaultBg: "#75BF7A",
              defaultColor: "#FFFFFF",
            },
          },
        }}
      >
        <div className="App">
          <div className="header">
            <MenuComponent current={current} onClick={onClick} />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Map" element={<Map />} />
            </Routes>
          </div>
          <FloatButton.BackTop />
        </div>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
