import React, { useState, Fragment } from "react";
import Axios from "axios";
import ReadOnlyBuku from "./ReadOnlyBuku";
import EditableBuku from "./EditableBuku";

function CariBuku() {
  const [daftar, lihatDaftar] = useState([]);
  const [teks, setTeks] = useState();
  const [show, setShow] = useState(false);
  const [ubah, setUbah] = useState();
  const [ubahData, setUbahData] = useState({
    judul: "",
    penerbit: "",
    pengarang: "",
  });

  const cari = (teks_pass) => {
    Axios.get(`http://localhost:3001/buku/cari/${teks_pass}`).then(
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
    setUbah(val.id_buku);

    const dataAsli = {
      judul: val.judul,
      penerbit: val.penerbit,
      pengarang: val.pengarang,
    };

    setUbahData(dataAsli);
  };

  const handleKlikX = () => {
    setUbah();
  };

  const updBuku = (id) => {
    if (window.confirm("Apakah anda yakin untuk mengubah data?")) {
      Axios.put("http://localhost:3001/buku/update", {
        judul: ubahData.judul,
        penerbit: ubahData.penerbit,
        pengarang: ubahData.pengarang,
        id_buku: id,
      }).then((response) => alert("Sukses!"));
    }
  };

  return (
    <div>
      <div className="search">
        <h3 className="judul">Pencarian Buku</h3>
        <input
          type="text"
          name="pencarian"
          placeholder="Masukkan Judul Buku"
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
                    <th>Judul</th>
                    <th>Penerbit</th>
                    <th>Pengarang</th>
                    <th>Tanggal Penambahan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {daftar.map((val, key) => (
                    <Fragment>
                      {ubah === val.id_buku ? (
                        <EditableBuku
                          val={val}
                          ubahData={ubahData}
                          handleUbahData={handleUbahData}
                          handleKlikX={handleKlikX}
                          updBuku={updBuku}
                        />
                      ) : (
                        <ReadOnlyBuku
                          val={val}
                          handleKlikUbah={handleKlikUbah}
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

export default CariBuku;
