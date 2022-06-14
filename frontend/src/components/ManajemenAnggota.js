import React, { useState } from "react";
import Axios from "axios";
import CariAnggota from "./CariAnggota";

function DaftarAnggota() {
  const [daftar, lihatDaftar] = useState([]);
  const [jumlah, lihatJumlah] = useState([]);
  const [namaBaru, setNamaBaru] = useState();
  const [alamatBaru, setAlamatBaru] = useState();
  const [telpBaru, setTelpBaru] = useState();
  const [show, setShow] = useState(false);

  Axios.get("http://localhost:3001/anggota/daftar").then((response) => {
    console.log = response;
    lihatDaftar(response.data);
  });

  Axios.get("http://localhost:3001/anggota/jumlah").then((response) => {
    console.log = response;
    lihatJumlah(response.data);
  });

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
      <CariAnggota />
      <div className="centered">
        <button name="edit" onClick={() => setShow(!show)}>
          Ubah
        </button>
        {daftar.map((val, key) => {
          return (
            <div className="view" key={val.id_anggota}>
              {val.id_anggota}
              {val.nama}
              {val.alamat}
              {val.no_telp}

              <button
                onClick={() => {
                  hapusAnggota(val.id_anggota);
                }}
              >
                Hapus
              </button>

              {show ? (
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
                  <button
                    onClick={() => {
                      updAnggota(val.id_anggota);
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
              <div>Total Anggota: {val.jumlah}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DaftarAnggota;
