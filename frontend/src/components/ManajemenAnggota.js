import "../style/input.css";
import React, { useState } from "react";
import Axios from "axios";

function DaftarAnggota() {
  const [daftar, lihatDaftar] = useState([]);
  const [namaBaru, setNamaBaru] = useState();
  const [alamatBaru, setAlamatBaru] = useState();
  const [telpBaru, setTelpBaru] = useState();

  const getAnggota = () => {
    Axios.get("http://localhost:3001/anggota/daftar").then((response) => {
      console.log = response;
      lihatDaftar(response.data);
    });
  };

  const updAnggota = (id) => {
    if (window.confirm("Apakah anda yakin untuk mengubah data?")) {
      Axios.put("http://localhost:3001/anggota/update", {
        nama: namaBaru,
        alamat: alamatBaru,
        no_telp: telpBaru,
        id_anggota: id,
      }).then((response) => alert("Sukses!"));
    }
  };

  const hapusAnggota = (id) => {
    if (window.confirm("Apakah anda yakin untuk menghapus data?")) {
      Axios.delete(`http://localhost:3001/anggota/delete/${id}`);
    }
  };

  return (
    <div>
      <div className="view">
        <button onClick={getAnggota}>Daftar Anggota</button>

        {daftar.map((val, key) => {
          return (
            <div>
              {val.nama}
              {val.alamat}
              {val.no_telp}

              <div>
                <label>Nama</label>
                <input
                  type="text"
                  name="nama"
                  placeholder={val.nama}
                  onChange={(event) => {
                    setNamaBaru(event.target.value);
                  }}
                />

                <label>Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  placeholder={val.alamat}
                  onChange={(event) => {
                    setAlamatBaru(event.target.value);
                  }}
                />

                <label>Nomor Telepon</label>
                <input
                  type="text"
                  name="telp"
                  placeholder={val.no_telp}
                  onChange={(event) => {
                    setTelpBaru(event.target.value);
                  }}
                />
                <button className="update"
                  onClick={() => {
                    updAnggota(val.id_anggota);
                  }}
                >
                  Ubah
                </button>
                <button className="delete"
                  onClick={() => {
                    hapusAnggota(val.id_anggota);
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

export default DaftarAnggota;
