import "../style/input.css";
import React, { useState } from "react";
import Axios from "axios";

function DaftarBuku() {
  const [daftar, lihatDaftar] = useState([]);
  const [judulBaru, setJudulBaru] = useState();
  const [penerbitBaru, setPenerbitBaru] = useState();
  const [pengarangBaru, setPengarangBaru] = useState();

  const getBuku = () => {
    Axios.get("http://localhost:3001/buku/daftar").then((response) => {
      console.log = response;
      lihatDaftar(response.data);
    });
  };

  const updBuku = (id) => {
    if (window.confirm("Apakah anda yakin untuk mengubah data?")) {
      Axios.put("http://localhost:3001/buku/update", {
        judul: judulBaru,
        penerbit: penerbitBaru,
        pengarang: pengarangBaru,
        id_buku: id,
      }).then((response) => alert("Sukses!"));
    }
  };

  const hapusBuku = (id) => {
    if (window.confirm("Apakah anda yakin untuk menghapus data?")) {
      Axios.delete(`http://localhost:3001/buku/delete/${id}`);
    }
  };

  return (
    <div>
      <div className="view">
        <button onClick={getBuku}>Daftar Buku</button>
        {daftar.map((val, key) => {
          return (
            <div>
              {val.judul}
              {val.penerbit}
              {val.pengarang}
              {val.tanggal}

              <div>
                <label>Judul</label>
                <input
                  type="text"
                  name="judul"
                  placeholder={val.judul}
                  onChange={(event) => {
                    setJudulBaru(event.target.value);
                  }}
                />

                <label>Penerbit</label>
                <input
                  type="text"
                  name="penerbit"
                  placeholder={val.penerbit}
                  onChange={(event) => {
                    setPenerbitBaru(event.target.value);
                  }}
                />

                <label>Pengarang</label>
                <input
                  type="text"
                  name="pengarang"
                  placeholder={val.pengarang}
                  onChange={(event) => {
                    setPengarangBaru(event.target.value);
                  }}
                />
                <button className="update"
                  onClick={() => {
                    updBuku(val.id_buku);
                  }}
                >
                  Ubah
                </button>
                <button className="delete"
                  onClick={() => {
                    hapusBuku(val.id_buku);
                  }}
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DaftarBuku;
