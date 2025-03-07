import { useState, useEffect } from "react";
import axios from "axios";
import { Edit3, Trash2, Loader2  } from "lucide-react";
import Modal from "../components/Modal";

import "./product.css";

export default function AdminAddBrands() {
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productQuantity, setProductQuantity] = useState("");
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const API_URL = "https://nova-care-production.up.railway.app/api";

  // Fetch Brands from Backend
  useEffect(() => {
    axios
      .get(`${API_URL}/brands`)
      .then((res) => {
        setBrands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch brands");
        setLoading(false);
      });
  }, []);

  // Add Brand
  const addBrand = async () => {
    if (!brandName || !brandImage) return alert("Please fill all fields!");

    const formData = new FormData();
    formData.append("name", brandName);
    formData.append("image", brandImage);

    try {
      const res = await axios.post(`${API_URL}/add-brand`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBrands([...brands, res.data]);
      setBrandName("");
      setBrandImage(null);
      setShowBrandModal(false);
    } catch (err) {
      alert("Error adding brand");
    }
  };

  // Add Product
  const addProduct = async () => {
    if (!selectedBrand || !productName || !productPrice || !productDiscount || !productImage || !productQuantity) {
      return alert("Please fill all fields!");
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("discount", productDiscount);
    formData.append("quantity", productQuantity);
    formData.append("image", productImage);

    try {
      const res = await axios.post(`${API_URL}/add-product/${selectedBrand}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update brand list with new product
      setBrands(
        brands.map((brand) =>
          brand._id === selectedBrand
            ? { ...brand, products: [...(brand.products || []), res.data] }
            : brand
        )
      );

      setProductName("");
      setProductPrice("");
      setProductDiscount("");
      setProductImage(null);
      setProductQuantity("");
      setShowProductModal(false);
    } catch (err) {
      alert("Error adding product");
    }
  };
  const editBrand = async () => {
    if (!editingBrand || !editingBrand._id) return alert("Brand not selected!");
  
    const formData = new FormData();
    formData.append("name", editingBrand.name);
    if (editingBrand.image) {
      formData.append("image", editingBrand.image);
    }
  
    try {
      const res = await axios.put(`${API_URL}/api/edit-brand/${editingBrand._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
  
      setBrands(
        brands.map((brand) => (brand._id === editingBrand._id ? res.data : brand))
      );
  
      setEditingBrand(null);
    } catch (err) {
      alert("Error updating brand");
    }
  };
  
  const editProduct = async () => {
    if (!editingProduct || !editingProduct._id) {
      return alert("Product not selected!");
    }
  
    const formData = new FormData();
    formData.append("name", editingProduct.name);
    formData.append("price", editingProduct.price);
    formData.append("discount", editingProduct.discount);
    formData.append("quantity", editingProduct.quantity);
    if (editingProduct.image) {
      formData.append("image", editingProduct.image);
    }
  
    try {
      const res = await axios.put(`${API_URL}/api/edit-product/${editingProduct._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
  
      setBrands(
        brands.map((brand) =>
          brand._id === editingProduct.brandId
            ? {
                ...brand,
                products: brand.products.map((product) =>
                  product._id === editingProduct._id ? { ...product, ...res.data.product } : product
                ),
              }
            : brand
        )
      );
  
      setEditingProduct(null);
    } catch (err) {
      alert("Error updating product");
    }
  };
  
  const deleteBrand = async (id) => {
    console.log("Deleting brand:", id);  // ✅ Log the ID
  
    if (!id) return alert("Invalid brand ID!");
  
    try {
      await axios.delete(`${API_URL}/api/delete-brand/${id}`);
      setBrands(brands.filter((brand) => brand._id !== id));
    } catch (err) {
      console.error("Error deleting brand:", err.response?.data || err);
      alert("Error deleting brand");
    }
  };
  
  const deleteProduct = async (id) => {
    if (!id) return alert("Invalid product ID!");
  
    try {
      await axios.delete(`${API_URL}/api/delete-product/${id}`);
      setBrands(
        brands.map((brand) => ({
          ...brand,
          products: brand.products.filter((product) => product._id !== id),
        }))
      );
    } catch (err) {
      alert("Error deleting product");
    }
  };
  
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "95%", margin: "auto" }}>
     
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* Add Brand Button */}
      <div  style={{ marginBottom: "20px",}}> 
      <button className="bu" onClick={() => setShowBrandModal(true)}>Add Brand</button>
      <button className="bu" onClick={() => setShowProductModal(true)}>Add Product</button>
      
      </div>
<Modal isOpen={showBrandModal} onClose={() => setShowBrandModal(false)}>
<form className="container">
<h2>Add Brand</h2>
      <div className="grid">
        
      <div className="form-group">
      <div className="floating-label">
          <input type="text" name="brandName" placeholder="Brand Name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          <label>Brand Name</label>
        </div>
          </div>
          <div className="form-group">
        <div className="floating-label">
          <input type="file" name="brandImage" onChange={(e) => setBrandImage(e.target.files[0])} />
          <label>Brand Image</label>
        </div>
          </div>
          </div>
          <button className="button" onClick={addBrand}>Add Brand</button>
          
        </form>
</Modal>
      

      {/* Add Product Button */}
     
    
<Modal isOpen={showProductModal} onClose={() => setShowProductModal(false)}>
<form className="container">
<h2>Add Product</h2>
        <div className="grid">
        <div className="form-group">
        <div className="floating-label">
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
          <label>select a brand</label>
        </div>
          </div>
          <div className="form-group">
          <div className="floating-label">
          <input type="text" name="productName" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <label>Product Name</label>
        </div>
      </div> 
      <div className="form-group">
      <div className="floating-label">
          <input type="number" name="productPrice" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          <label>Price</label>
        </div>
      </div> 
         
          <div className="form-group">
          <div className="floating-label">
          <input type="text" name="productDiscount" placeholder="Discount" value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)} />
          <label>Discount</label>
        </div>
      </div>
          <div className="form-group">
          <div className="floating-label">
          <input type="number" name="productQuantity" placeholder="Quantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
          <label>Quantity</label>
        </div>
      </div>
          <div className="form-group">
          <div className="floating-label">
          <input type="file" name="productImage" onChange={(e) => setProductImage(e.target.files[0])} />
          <label>Product Image</label>
        </div>
      </div>

   </div>
   
   <button className="button" onClick={addProduct}>Add Product</button>
                  </form>  
</Modal>

      {/* Display Brands and Products */}
      <div>
      <div style={{ display: "flex" }}>
        {/* Brands List on the Left */}
        <div className="brand-list">
      <h2 className="brand-header">Brands</h2>

      {loading ? (
        <div className="brand-loading">
          <Loader2 className="loading-icon" size={24} />
          <span>Loading...</span>
        </div>
      ) : error ? (
        <p className="brand-error">{error}</p>
      ) : brands.length === 0 ? (
        <p className="brand-empty">No brands added yet.</p>
      ) : (
        <ul className="brand-items">
          {brands.map((brand) => (
            <li
              key={brand._id}
              className="brand-item"
              onClick={() => setSelectedBrand(brand)}
            >
              {brand.name}
            </li>
          ))}
        </ul>
      )}
    </div>

        {/* Products on the Right */}
        <div style={{ width: "70%", padding: "10px" }}>
          {selectedBrand && (
        <div className="product-list">
          <h2>{selectedBrand.name} - Products</h2>
              {selectedBrand.image && (
                <img src={`https://nova-care-production.up.railway.app${selectedBrand.image}`} alt={selectedBrand.name} style={{ width: "100px" }} />
              )}
              <button className="edit-btn" onClick={() => setEditingBrand(selectedBrand)}><Edit3 /></button>
<button className="delete-btn" onClick={() => deleteBrand(selectedBrand._id)}><Trash2 /></button>

<div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedBrand.products?.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={`https://nova-care-production.up.railway.app${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              </td>
              <td>{product.name}</td>
              <td>Rs. {product.price}</td>
              <td>{product.discount}%</td>
              <td>{product.quantity}</td>
              <td>
                <button className="edit-btn" onClick={() => setEditingProduct(product)}>
                  <Edit3 size={16} />
                </button>
                <button className="delete-btn" onClick={() => deleteProduct(product._id)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
       
        </div>
      )}
        </div>
      </div>
           {/* Edit Brand Modal */}
<Modal isOpen={editingBrand} onClose={() => setEditingBrand(false)}>
  
  <form className= "container">
  <div className="grid">
    <h3>Edit Brand</h3>
    <div className="form-group">
    <div className="floating-label">
      <input type="text" name="editBrandName" value={editingBrand?.name || ""} onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })} />
      <label>Name</label>
       </div>
     </div>
      <div className="form-group">
      <div className="floating-label">
      <input type="file" name="editBrandImage" onChange={(e) => setEditingBrand({ ...editingBrand, image: e.target.files[0] })} />
      <label>Image</label>
       </div>
     </div>
  </div>
      <button className="button" onClick={editBrand}>Save Changes</button>
       
  </form>
</Modal>
<Modal isOpen={editingProduct} onClose={() => setEditingProduct(false)}>
  <form className= "container">
  <div className="grid">
    <h3>Edit Product</h3>
    <div className="form-group">
    <div className="floating-label">
      <input type="text" name="editProductName" value={editingProduct?.name || ""} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
      <label>Description</label>
       </div>
     </div>
      <div className="form-group">
    <div className="floating-label">
      <input type="number" name="editProductPrice" value={editingProduct?.price || ""} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} />
      <label>Description</label>
       </div>
     </div>
      <div className="form-group">
    <div className="floating-label">
      <input type="text" name="editProductDiscount" value={editingProduct?.discount || ""} onChange={(e) => setEditingProduct({ ...editingProduct, discount: e.target.value })} />
      <label>Description</label>
       </div>
     </div>
      <div className="form-group">
    <div className="floating-label">
    <input type="number" name="editProductQuantity" value={editingProduct?.quantity || ""} onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })} />
    <label>Description</label>
       </div>
     </div>
    <div className="form-group">
    <div className="floating-label">
      <input type="file" name="editProductImage" onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.files[0] })} />
      <label>Description</label>
       </div>
     </div>
      <button  className="button" onClick={editProduct}>Save Changes</button>
       </div>
  </form>
</Modal>


      </div>
    </div>
  );
}