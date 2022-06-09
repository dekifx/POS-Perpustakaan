import "./App.css";
import React from "react";
import TambahBuku from "./components/TambahBuku";
import DaftarBuku from "./components/ManajemenBuku";
import DaftarAnggota from "./components/ManajemenAnggota";

function App() {
  return (
    <div className="App">
      <TambahBuku />
      <DaftarBuku />
      <DaftarAnggota />
    </div>
  );
}

export default App;
