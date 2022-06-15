import React from "react";

const EditableAnggota = ({
  val,
  ubahData,
  handleUbahData,
  handleKlikX,
  updAnggota,
}) => {
  return (
    <tr>
      <td>{val.id_anggota}</td>
      <td>
        <input
          type="text"
          name="nama"
          required={true}
          placeholder={"Masukkan Nama"}
          value={ubahData.nama}
          onChange={handleUbahData}
        />
      </td>
      <td>
        <input
          type="text"
          name="alamat"
          required={true}
          placeholder={"Masukkan Alamat"}
          value={ubahData.alamat}
          onChange={handleUbahData}
        />
      </td>
      <td>
        <input
          type="text"
          name="no_telp"
          required={true}
          placeholder={"Masukkan Nomor Telepon"}
          value={ubahData.pengarang}
          onChange={handleUbahData}
        />
      </td>

      <td>
        <button
          onClick={() => {
            updAnggota(val.id_anggota);
          }}
        >
          Simpan
        </button>
        <button onClick={handleKlikX}>x</button>
      </td>
    </tr>
  );
};

export default EditableAnggota;
