import "../style/input.css";
import React, { useState } from "react";
import Axios from "axios";

function DataPeminjaman() {
  const [daftar, lihatDaftar] = useState([]);

  const peminjaman = () => {
    Axios.get("http://localhost:3001/peminjaman/daftar").then((response) => {
      console.log = response;
      lihatDaftar(response.data);
    });
  };

  const kembalikan = (id1, id2) => {
    if (window.confirm("Kembalikan Buku?")) {
      Axios.put("http://localhost:3001/peminjaman/update", {
        id_pinjam: id1,
        id_buku: id2,
      }).then((response) => alert("Sukses!"));
    }
  };

  return (
    <div>
      <div className="view">
        <button onClick={peminjaman}>Daftar Peminjaman</button>

        {daftar.map((val, key) => {
          return (
            <div>
              {val.nama}
              {val.judul}
              {val.tgl_pinjam}
              {val.tgl_harus_kembali}
              {val.tgl_kembali}
              {val.keterangan}

              <button
                onClick={() => {
                  kembalikan(val.id_anggota);
                }}
              >
                Kembalikan
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DataPeminjaman;
