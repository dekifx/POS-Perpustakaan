import React from "react";

const EditableBuku = ({
  val,
  ubahData,
  handleUbahData,
  handleKlikX,
  updBuku,
}) => {
  return (
    <tr>
      <td>{val.id_buku}</td>
      <td>
        <input
          type="text"
          name="judul"
          required={true}
          placeholder={"Masukkan Judul"}
          value={ubahData.judul}
          onChange={handleUbahData}
        />
      </td>
      <td>
        <input
          type="text"
          name="penerbit"
          required={true}
          placeholder={"Masukkan Penerbit"}
          value={ubahData.penerbit}
          onChange={handleUbahData}
        />
      </td>
      <td>
        <input
          type="text"
          name="pengarang"
          required={true}
          placeholder={"Masukkan Pengarang"}
          value={ubahData.pengarang}
          onChange={handleUbahData}
        />
      </td>
      <td>{val.tanggal}</td>
      <td>
        <button
          onClick={() => {
            updBuku(val.id_buku);
          }}
        >
          Simpan
        </button>
        <button onClick={handleKlikX}>x</button>
      </td>
    </tr>
  );
};

export default EditableBuku;
