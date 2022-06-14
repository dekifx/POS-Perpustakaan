import "./style/App.css";
import React from "react";
import TambahBuku from "./components/TambahBuku";
import TambahAnggota from "./components/TambahAnggota";
import DaftarBuku from "./components/ManajemenBuku";
import DaftarAnggota from "./components/ManajemenAnggota";
import DataPeminjaman from "./components/DataPeminjaman";

function App() {
  return (
    <div className="App">
      <TambahBuku />
      <TambahAnggota />
      <DaftarBuku />
      <DaftarAnggota />
      <DataPeminjaman />
    </div>
  );
}

export default App;
