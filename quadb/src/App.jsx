import { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Table from "./components/Table";
import Footer from "./components/Footer";
import AddHome from "./components/AddHome";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Table />
      <Footer />
      <AddHome />
    </>
  );
}

export default App;
