import React, { useState, Fragment } from "react";
import Axios from "axios";
import ReadOnlyAnggota from "./ReadOnlyAnggota";
import EditableAnggota from "./EditableAnggota";

function CariAnggota() {
  const [daftar, lihatDaftar] = useState([]);
  const [teks, setTeks] = useState();
  const [show, setShow] = useState(false);
  const [ubah, setUbah] = useState();
  const [ubahData, setUbahData] = useState({
    nama: "",
    alamat: "",
    no_telp: "",
  });

  const cari = (teks_pass) => {
    Axios.get(`http://localhost:3001/anggota/cari/${teks_pass}`).then(
      (response) => {
        console.log = response;
        lihatDaftar(response.data);
      }
    );
  };

  const handleUbahData = (event) => {
    event.preventDefault();
    const namaKolom = event.target.getAttribute("name");
    const isiKolom = event.target.value;
    const dataBaru = { ...ubahData };

    dataBaru[namaKolom] = isiKolom;

    setUbahData(dataBaru);
  };

  const handleKlikUbah = (event, val) => {
    event.preventDefault();
    setUbah(val.id_anggota);

    const dataAsli = {
      nama: val.nama,
      alamat: val.alamat,
      no_telp: val.no_telp,
    };

    setUbahData(dataAsli);
  };

  const handleKlikX = () => {
    setUbah();
  };

  const updAnggota = (id) => {
    if (window.confirm("Apakah anda yakin untuk mengubah data?")) {
      Axios.put("http://localhost:3001/anggota/update", {
        nama: ubahData.nama,
        alamat: ubahData.alamat,
        no_telp: ubahData.no_telp,
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
      <div className="search">
        <h3 className="judul">Pencarian Anggota</h3>
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
            setShow(true);
            cari(teks);
          }}
        >
          Cari
        </button>
      </div>

      <div>
        {show ? (
          <div className="tabel">
            <form>
              <table id="daftar">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Nomor Telepon</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {daftar.map((val, key) => (
                    <Fragment>
                      {ubah === val.id_anggota ? (
                        <EditableAnggota
                          val={val}
                          ubahData={ubahData}
                          handleUbahData={handleUbahData}
                          handleKlikX={handleKlikX}
                          updAnggota={updAnggota}
                        />
                      ) : (
                        <ReadOnlyAnggota
                          val={val}
                          handleKlikUbah={handleKlikUbah}
                          hapusAnggota={hapusAnggota}
                        />
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CariAnggota;
