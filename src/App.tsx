
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import KeyMappingsPane from "./pretender/KeyMappingsPane";
import MainScreen from "./pretender/MainScreen";
import store from "./pretender/store/store";
import './App.css'

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/keys" element={<KeyMappingsPane />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
