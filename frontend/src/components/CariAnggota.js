import React, { useState } from "react";
import Axios from "axios";

function CariAnggota() {
  const [daftar, lihatDaftar] = useState([]);
  const [teks, setTeks] = useState();

  const cari = (teks_pass) => {
    Axios.get(`http://localhost:3001/anggota/cari/${teks_pass}`).then(
      (response) => {
        console.log = response;
        lihatDaftar(response.data);
      }
    );
  };

  return (
    <div>
      <div className="search">
        <input
          type="text"
          name="pencarian"
          placeholder="Masukkan Nama"
          onChange={(event) => {
            setTeks(event.target.value);
          }}
        />
        <button
          onClick={() => {
            cari(teks);
          }}
        >
          Cari
        </button>
      </div>
      <div className="view">
        {daftar.map((val, key) => {
          return (
            <div>
              {val.nama}
              {val.alamat}
              {val.no_telp}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CariAnggota;
