import React, { useState } from "react";
import Axios from "axios";
import CariBuku from "./CariBuku";

function DaftarBuku() {
  const [daftar, lihatDaftar] = useState([]);
  const [jumlah, lihatJumlah] = useState([]);
  const [judulBaru, setJudulBaru] = useState();
  const [penerbitBaru, setPenerbitBaru] = useState();
  const [pengarangBaru, setPengarangBaru] = useState();
  const [show, setShow] = useState(false);

  Axios.get("http://localhost:3001/buku/daftar").then((response) => {
    console.log = response;
    lihatDaftar(response.data);
  });

  Axios.get("http://localhost:3001/buku/jumlah").then((response) => {
    console.log = response;
    lihatJumlah(response.data);
  });

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

  return (
    <div>
      <div className="search">
        <CariBuku />
      </div>

      <div>
        <button name="edit" onClick={() => setShow(!show)}>
          Ubah
        </button>
        {daftar.map((val, key) => {
          return (
            <div className="view" key={val.id_buku}>
              {val.judul}
              {val.penerbit}
              {val.pengarang}
              {val.tanggal}

              {show ? (
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
                  <button
                    onClick={() => {
                      updBuku(val.id_buku);
                    }}
                  >
                    Simpan
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="jumlah">
        {jumlah.map((val) => {
          return (
            <div>
              <div>Total Buku: {val.jumlah}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DaftarBuku;
