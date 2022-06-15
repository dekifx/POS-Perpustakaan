import React from "react";

const ReadOnlyAnggota = ({ val, handleKlikUbah, hapusAnggota }) => {
  return (
    <tr key={val.id_anggota}>
      <td>{val.id_anggota}</td>
      <td>{val.nama}</td>
      <td>{val.alamat}</td>
      <td>{val.no_telp}</td>

      <td>
        <button onClick={(event) => handleKlikUbah(event, val)}>Ubah</button>
        <button
          onClick={() => {
            hapusAnggota(val.id_anggota);
          }}
        >
          Hapus
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyAnggota;
