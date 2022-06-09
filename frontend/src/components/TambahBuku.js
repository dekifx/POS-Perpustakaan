import "../style/input.css";
import React, { useState } from "react";
import Axios from "axios";

function TambahBuku() {
  const [judul, setJudul] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [pengarang, setPengarang] = useState("");

  const tambah = () => {
    Axios.post("http://localhost:3001/buku/tambah", {
      judul: judul,
      penerbit: penerbit,
      pengarang: pengarang,
    }).then(() => {
      console.log = "Sukses!";
    });
  };

  return (
    <div className="input">
      <label>Judul</label>
      <input
        type="text"
        onChange={(event) => {
          setJudul(event.target.value);
        }}
      />

      <label>Penerbit</label>
      <input
        type="text"
        onChange={(event) => {
          setPenerbit(event.target.value);
        }}
      />

      <label>Pengarang</label>
      <input
        type="text"
        onChange={(event) => {
          setPengarang(event.target.value);
        }}
      />

      <button className="add" onClick={tambah}>Tambah Buku</button>
    </div>
  );
}

export default TambahBuku;
