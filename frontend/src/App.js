import "./style/App.css";
import React, { useState } from "react";
import TambahBuku from "./components/TambahBuku";
import TambahAnggota from "./components/TambahAnggota";
import DaftarBuku from "./components/ManajemenBuku";
import DaftarAnggota from "./components/ManajemenAnggota";
import DataPeminjaman from "./components/DataPeminjaman";

function App() {
  const [active, setActive] = useState("DataPeminjaman");
  return (
    <div className="App">
      <div className="Header">
        <nav className="NavBar">
          <div className="Title">
            <h3>POS Perpustakaan</h3>
          </div>

          <h3 onClick={() => setActive("TambahBuku")}>Tambah Buku</h3>
          <h3 onClick={() => setActive("TambahAnggota")}>Tambah Anggota</h3>
          <h3 onClick={() => setActive("DaftarBuku")}>Daftar Buku</h3>
          <h3 onClick={() => setActive("DaftarAnggota")}>Daftar Anggota</h3>
          <h3 onClick={() => setActive("DataPeminjaman")}>Data Peminjaman</h3>
        </nav>
        <hr />
      </div>
      {active === "TambahBuku" && <TambahBuku />}
      {active === "TambahAnggota" && <TambahAnggota />}
      {active === "DaftarBuku" && <DaftarBuku />}
      {active === "DaftarAnggota" && <DaftarAnggota />}
      {active === "DataPeminjaman" && <DataPeminjaman />}
    </div>
  );
}

export default App;
