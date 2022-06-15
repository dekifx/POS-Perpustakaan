import React from "react";

const ReadOnlyBuku = ({ val, handleKlikUbah }) => {
  return (
    <tr key={val.id_buku}>
      <td>{val.id_buku}</td>
      <td>{val.judul}</td>
      <td>{val.penerbit}</td>
      <td>{val.pengarang}</td>
      <td>{val.tanggal}</td>
      <td>
        <button onClick={(event) => handleKlikUbah(event, val)}>Ubah</button>
      </td>
    </tr>
  );
};

export default ReadOnlyBuku;
