// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Papa from 'papaparse';                 // ← new
// import * as XLSX from 'xlsx'; 
// //import '../CSS/AddProduct.css';
// import '../CSS/Product/Addproduct.css';

// function AddProduct() {
//     const nevigate=useNavigate();
//     const [mode,setMode]=useState('single');
//     const [product,setproduct] = useState({
//         name: '',
//         description: '',
//         price: '',
//         imageUrl: '',
//     });
//     const [file,setFile]=useState(null); // for csv

   
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setproduct((prevProduct) => ({
//             ...prevProduct,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8000/add-product', product);
//             console.log('Product added successfully:', response.data);

//             // Reset form after successful submission
//             setproduct({
//                 name: '',
//                 description: '',
//                 price: '',
//                 imageUrl: '',
//             });
//             nevigate('/')
//         } catch (error) {
//             console.error('Error adding product:', error);
//         }
//     };

//     return (
//         <div className="container mt-4">
//       <h2 className="text-primary mb-3">🛒 Add New Product</h2>
//       <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light">
//         <input className="form-control mb-2" name="name" placeholder="Product Name" onChange={handleChange} />
//         <input className="form-control mb-2" name="amount" placeholder="Amount" onChange={handleChange} />
//         <textarea className="form-control mb-2" name="description" placeholder="Description" onChange={handleChange} />
//         <input className="form-control mb-3" name="imageUrl" placeholder="Image URL" onChange={handleChange} />
//         <button className="btn btn-success">Add Product</button>
//       </form>
//     </div>



//     );
// }
// export default AddProduct;


// AddProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Product/Addproduct.css';

function AddProduct() {
  const navigate = useNavigate();

  const [mode, setMode] = useState('single');
  

  const [product, setProduct] = useState({
    name: '',
    description: '',
    amount: '',
    imageUrl: '',
  });
  
  const [file, setFile] = useState(null);

  const token = localStorage.getItem('token');
  if (!token) {
    alert("No token found. Please log in again.");
    return;
  }


  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/add-product', product,{
       headers: {
      Authorization: `Bearer ${token}`
      }
    }
      );
      setProduct({ name: '', description: '', amount: '', imageUrl: '' });
      navigate('/Shop');
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const handleBulkUpload = () => {
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data }) => sendBulk(data),
        error: console.error,
      });
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = XLSX.read(e.target.result, { type: 'binary' });
        const wsName = wb.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(wb.Sheets[wsName], { defval: '' });
        sendBulk(data);
      };
      reader.readAsBinaryString(file);
    }
  };

  const sendBulk = async (records) => {
    console.log("Sending bulk products:", records);

    const invalids = records.filter(p => !p.name || !p.amount);
    if (invalids.length) {
      alert(`Missing name/amount in ${invalids.length} product(s)`);
      return;
    }

    try {
      await axios.post('http://localhost:8000/add-products-bulk', { products: records });
      alert(`${records.length} products uploaded successfully.`);
      setFile(null);
      navigate('/Shop');
    } catch (err) {
      console.error('Bulk upload error:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3"> Add Products</h2>

      <div className="mb-3">
        <label className="me-3">
          <input
            type="radio"
            value="single"
            checked={mode === 'single'}
            onChange={e => setMode(e.target.value)}
          /> Single
        </label>
        <label>
          <input
            type="radio"
            value="bulk"
            checked={mode === 'bulk'}
            onChange={e => setMode(e.target.value)}
          /> Bulk
        </label>
      </div>

      {mode === 'single' && (
        <form onSubmit={handleSingleSubmit} className="card p-4 shadow-sm bg-light">
          <input
            className="form-control mb-2"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={e => setProduct(p => ({ ...p, [e.target.name]: e.target.value }))}
            required
          />
          <input
            className="form-control mb-2"
            name="amount"
            placeholder="Amount"
            value={product.amount}
            onChange={e => setProduct(p => ({ ...p, [e.target.name]: e.target.value }))}
            required
          />
          <textarea
            className="form-control mb-2"
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={e => setProduct(p => ({ ...p, [e.target.name]: e.target.value }))}
          />
          <input
            className="form-control mb-3"
            name="imageUrl"
            placeholder="Image URL"
            value={product.imageUrl}
            onChange={e => setProduct(p => ({ ...p, [e.target.name]: e.target.value }))}
          />
          <button className="btn btn-success">Add Product</button>
        </form>
      )}

      {mode === 'bulk' && (
        <div className="card p-4 shadow-sm bg-light">
          <label className="form-label">Upload CSV or Excel:</label>
          <input
            type="file"
            className="form-control mb-3"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={e => setFile(e.target.files[0])}
          />
          <button
            className="btn btn-primary"
            onClick={handleBulkUpload}
            disabled={!file}
          >
            Upload Bulk
          </button>
        </div>
      )}
    </div>
  );
}

export default AddProduct;