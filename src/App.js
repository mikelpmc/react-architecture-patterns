import React from "react";
import Home from "./components/home";
import { DataProvider } from "./context/dataProvider";

const App = () => (
  <DataProvider>
    <Home />
  </DataProvider>
);

export default App;
