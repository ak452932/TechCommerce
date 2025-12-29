import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Product/Addproduct.css';

export default function ShopMenu() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);   // ✅ fixed naming
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState({});

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const fetchProducts = () => {
    axios
      .get(`http://localhost:8000/products-paginated?search=${search}&page=${page}&limit=8`)
      .then(res => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error(err));
  };

  const startEdit = p => {
    setEditingId(p._id);
    setEditProduct({ ...p });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditProduct({});
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:8000/${editingId}`,
        editProduct,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      cancelEdit();
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async id => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      alert('Could not delete product.');
    }
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditProduct(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-success mb-4">Shop Menu</h2>

      {/* 🔎 Search Box */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="form-control mb-3"
      />

      <div className="row">
        {products.map(p => (
          <div key={p._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="img-container">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="card-img-top product-img"
                />
              </div>

              {editingId === p._id ? (
                <div className="card-body d-flex flex-column">
                  <input
                    className="form-control mb-2"
                    name="name"
                    value={editProduct.name}
                    onChange={handleEditChange}
                  />
                  <input
                    className="form-control mb-2"
                    name="amount"
                    value={editProduct.amount}
                    onChange={handleEditChange}
                  />
                  <textarea
                    className="form-control mb-2"
                    name="description"
                    value={editProduct.description}
                    onChange={handleEditChange}
                  />
                  <input
                    className="form-control mb-3"
                    name="imageUrl"
                    value={editProduct.imageUrl}
                    onChange={handleEditChange}
                  />

                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate" title={p.name}>
                    {p.name}
                  </h5>
                  <p className="card-text text-truncate" title={p.description}>
                    {p.description}
                  </p>

                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="text-primary h6 mb-0">
                      ₹{p.amount}
                    </span>
                    <div>
                      {user?.role === 'admin' && (
                        <button
                          className="btn btn-sm btn-outline-warning me-2"
                          onClick={() => startEdit(p)}
                        >
                          Edit
                        </button>
                      )}
                      {user?.role === 'admin' && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteProduct(p._id)}
                        >
                          Delete
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => navigate('/cart', { state: { product: p } })}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 📄 Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="btn btn-outline-primary ms-2"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}