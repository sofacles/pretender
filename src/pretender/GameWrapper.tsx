import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import KeyMappingsPane from "./KeyMappingsPane";
import MainScreen from "./MainScreen";
import store from "./store/store";
const GameWrapper = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/keys" element={<KeyMappingsPane />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default GameWrapper;
