import React, { useState } from "react";
import Axios from "axios";

function DataPeminjaman() {
  const [daftar, lihatDaftar] = useState([]);
  const [hasil, lihatHasil] = useState([]);
  const [tanggal1, setTgl1] = useState();
  const [tanggal2, setTgl2] = useState();
  const [show, setShow] = useState(true);
  const [idA, setIdA] = useState("");
  const [idB, setIdB] = useState("");

  Axios.get("http://localhost:3001/peminjaman/daftar").then((response) => {
    console.log = response;
    lihatDaftar(response.data);
  }, []);

  const kembalikan = (id1, id2) => {
    if (window.confirm("Kembalikan Buku?")) {
      Axios.put("http://localhost:3001/peminjaman/update", {
        id_pinjam: id1,
        id_buku: id2,
      }).then((response) => alert("Sukses!"));
    }
  };

  const filter = (tgl1_pass, tgl2_pass) => {
    Axios.get(
      `http://localhost:3001/peminjaman/filter/${tgl1_pass}/${tgl2_pass}`
    ).then((response) => {
      console.log = response;
      lihatHasil(response.data);
      setShow(false);
    });
  };

  const tambah_a = () => {
    Axios.post("http://localhost:3001/peminjaman/tambah_a", {
      id_anggota: idA,
    }).then(() => {
      console.log = "Sukses!";
    });
  };

  const tambah_b = () => {
    Axios.post("http://localhost:3001/peminjaman/tambah_b", {
      id_buku: idB,
    }).then(() => {
      console.log = "Sukses!";
    });
  };

  return (
    <div>
      <div className="filtering">
        <input
          type="date"
          name="tanggal1"
          onChange={(event) => {
            setTgl1(event.target.value);
          }}
        />
        {" - "}
        <input
          type="date"
          name="tanggal2"
          onChange={(event) => {
            setTgl2(event.target.value);
          }}
        />
        <button
          onClick={() => {
            filter(tanggal1, tanggal2);
          }}
        >
          Filter Tanggal
        </button>
      </div>

      <div className="peminjaman">
        <h4>Peminjaman</h4>
        <input
          type="text"
          name="ID Anggota"
          placeholder="Masukkan ID Anggota"
          onChange={(event) => {
            setIdA(event.target.value);
          }}
        />
        <button
          onClick={() => {
            tambah_a(idA);
          }}
        >
          Tambah
        </button>
        <input
          type="text"
          name="ID Buku"
          placeholder="Masukkan ID Buku"
          onChange={(event) => {
            setIdB(event.target.value);
          }}
        />
        <button
          onClick={() => {
            tambah_b(idB);
          }}
        >
          Tambah
        </button>
      </div>

      <div>
        <h4>Data Peminjaman</h4>
        {daftar.map((val, key) => {
          return (
            <div className="view">
              {show ? (
                <div>
                  {val.nama}
                  {val.judul}
                  {val.tgl_pinjam}
                  {val.tgl_harus_kembali}
                  {val.tgl_kembali}
                  {val.keterangan}
                  <button
                    onClick={() => {
                      kembalikan(val.id_pinjam, val.id_buku);
                    }}
                  >
                    Kembalikan
                  </button>{" "}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div>
        {hasil.map((val, key) => {
          return (
            <div className="view">
              <div>
                {val.nama}
                {val.judul}
                {val.tgl_pinjam}
                {val.tgl_harus_kembali}
                {val.tgl_kembali}
                {val.keterangan}
                <button
                  onClick={() => {
                    kembalikan(val.id_pinjam, val.id_buku);
                  }}
                >
                  Kembalikan
                </button>{" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DataPeminjaman;
