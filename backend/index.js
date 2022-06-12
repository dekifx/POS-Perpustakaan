const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.listen(3001, () => {
  console.log("Aktif gan");
});

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "db_perpustakaan",
  dateStrings: true,
});

app.post("/buku/tambah", (req, res) => {
  const judul = req.body.judul;
  const penerbit = req.body.penerbit;
  const pengarang = req.body.pengarang;

  db.query(
    "CALL tambah_buku (?, ?, ?)",
    [judul, penerbit, pengarang],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(["Sukses! Data Ditambahkan"]);
      }
    }
  );
});

app.get("/buku/daftar", (req, res) => {
  db.query(
    "SELECT *, DATE_FORMAT(tgl_penambahan,'%Y-%m-%d') AS tanggal FROM buku ORDER BY tgl_penambahan DESC",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/buku/update", (req, res) => {
  const id = req.body.id_buku;
  const judul = req.body.judul;
  const penerbit = req.body.penerbit;
  const pengarang = req.body.pengarang;

  db.query(
    "UPDATE buku SET judul = ?, penerbit = ?, pengarang = ? WHERE id_buku = ?",
    [judul, penerbit, pengarang, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/buku/cari/:teks_pass", (req, res) => {
  const teks = req.params.teks_pass;

  db.query(
    "SELECT * FROM buku WHERE judul LIKE ?",
    ["%" + teks + "%"],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/anggota/tambah", (req, res) => {
  const nama = req.body.nama;
  const alamat = req.body.alamat;
  const no_telp = req.body.no_telp;

  db.query(
    "CALL tambah_anggota (?, ?, ?)",
    [nama, alamat, no_telp],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(["Sukses! Data Ditambahkan"]);
      }
    }
  );
});

app.get("/anggota/daftar", (req, res) => {
  db.query("SELECT * FROM anggota", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/anggota/update", (req, res) => {
  const id = req.body.id_anggota;
  const nama = req.body.nama;
  const alamat = req.body.alamat;
  const no_telp = req.body.no_telp;

  db.query(
    "UPDATE anggota SET nama = ?, alamat = ?, no_telp = ? WHERE id_anggota = ?",
    [nama, alamat, no_telp, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/anggota/delete/:id_anggota", (req, res) => {
  const id = req.params.id_anggota;

  db.query("DELETE FROM anggota WHERE id_anggota = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/anggota/cari/:teks_pass", (req, res) => {
  const teks = req.params.teks_pass;

  db.query(
    "SELECT * FROM anggota WHERE nama LIKE ?",
    ["%" + teks + "%"],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/peminjaman/daftar", (req, res) => {
  db.query("SELECT * FROM data_pinjam ORDER BY tgl_pinjam", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/peminjaman/update", (req, res) => {
  const id1 = req.body.id_pinjam;
  const id2 = req.body.id_buku;

  db.query("CALL kembalikan_buku(?, ?)", [id1, id2], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
