import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pegawai, setPegawai] = useState([]);
  const [form, setForm] = useState({
    nama: '',
    nik: '',
    alamat: '',
    instalasi: ''
  });
  const [editId, setEditId] = useState(null);

  const getData = async () => {
    const res = await fetch('http://localhost:5000/pegawai');
    setPegawai(await res.json());
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:5000/pegawai/${editId}`
      : 'http://localhost:5000/pegawai';

    const method = editId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm({ nama: '', nik: '', alamat: '', instalasi: '' });
    setEditId(null);
    getData();
  };

  const handleEdit = (p) => {
    setForm({
      nama: p.nama,
      nik: p.nik,
      alamat: p.alamat,
      instalasi: p.instalasi
    });
    setEditId(p.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus data pegawai?')) {
      await fetch(`http://localhost:5000/pegawai/${id}`, {
        method: 'DELETE'
      });
      getData();
    }
  };

  return (
    <div className="container">
      <h2>Data Pegawai RSUD Abdul Moeloek</h2>

      <div className="form-card">
        <h3>{editId ? 'Edit Data Pegawai' : 'Tambah Data Pegawai'}</h3>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nama Pegawai"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            required
          />
          <input
            placeholder="NIK"
            value={form.nik}
            onChange={(e) => setForm({ ...form, nik: e.target.value })}
            required
          />
          <input
            placeholder="Alamat"
            value={form.alamat}
            onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            required
          />
          <input
            placeholder="Instalasi"
            value={form.instalasi}
            onChange={(e) => setForm({ ...form, instalasi: e.target.value })}
            required
          />

          <button type="submit" className={editId ? 'edit' : ''}>
            {editId ? 'Update Data' : 'Simpan Data'}
          </button>
        </form>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>NIK</th>
              <th>Alamat</th>
              <th>Instalasi</th>
              <th className="aksi">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pegawai.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  Belum ada data pegawai
                </td>
              </tr>
            ) : (
              pegawai.map((p) => (
                <tr key={p.id}>
                  <td>{p.nama}</td>
                  <td>{p.nik}</td>
                  <td>{p.alamat}</td>
                  <td>{p.instalasi}</td>
                  <td className="aksi">
                    <div className="action">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(p.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;