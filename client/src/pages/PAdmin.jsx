import { useState, useEffect } from "react";
import axios from "axios";

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


  const API_URL = "http://localhost:5000/api";

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
      const res = await axios.put(`${API_URL}/edit-brand/${editingBrand._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Brand updated successfully:", res.data);
      setEditingBrand(null);
    } catch (err) {
      console.error("Error updating brand:", err.response ? err.response.data : err.message);
      alert("Error updating brand");
    }
  };
  
  const editProduct = async () => {
    if (!editingProduct.name || !editingProduct.price) {
      return alert("Please fill all fields!");
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
      const res = await axios.put(`${API_URL}/edit-product/${editingProduct._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setBrands(
        brands.map((brand) =>
          brand._id === editingProduct.brandId
            ? {
                ...brand,
                products: brand.products.map((product) =>
                  product._id === editingProduct._id ? { ...product, ...res.data } : product
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
  
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Admin Panel - Manage Brands</h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* Add Brand Button */}
      <button onClick={() => setShowBrandModal(true)}>Add Brand</button>

      {showBrandModal && (
        <div>
          <input type="text" name="brandName" placeholder="Brand Name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          <input type="file" name="brandImage" onChange={(e) => setBrandImage(e.target.files[0])} />
          <button onClick={addBrand}>Add Brand</button>
          <button onClick={() => setShowBrandModal(false)}>Cancel</button>
        </div>
      )}

      {/* Add Product Button */}
      <button onClick={() => setShowProductModal(true)}>Add Product</button>

      {showProductModal && (
        <div>
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
          <input type="text" name="productName" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <input type="number" name="productPrice" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          <input type="text" name="productDiscount" placeholder="Discount" value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)} />
          <input type="number" name="productQuantity" placeholder="Quantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
          <input type="file" name="productImage" onChange={(e) => setProductImage(e.target.files[0])} />
          <button onClick={addProduct}>Add Product</button>
          <button onClick={() => setShowProductModal(false)}>Cancel</button>
        </div>
      )}

      {/* Display Brands and Products */}
      <div>
        <h2>Brands List</h2>
        {brands.length === 0 ? (
          <p>No brands added yet.</p>
        ) : (
          brands.map((brand) => (
            <div key={brand._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              <h3>{brand.name}</h3>
              <button onClick={() => setEditingBrand(brand)}>Edit</button>

              {brand.image && (
                <img
                  src={`http://localhost:5000${brand.image}`} // ✅ Fixed Image URL
                  alt={brand.name}
                  style={{ width: "100px" }}
                />
              )}
              <h4>Products:</h4>
              {brand.products && brand.products.length > 0 ? (
                <ul>
                  {brand.products.map((product) => (
                    <li key={product._id}>
                      {product.name} - ${product.price} ({product.discount}% off)
                      <button onClick={() => setEditingProduct(product)}>Edit</button>
                      {product.image && (
                        <img
                          src={`http://localhost:5000${product.image}`} // ✅ Fixed Product Image URL
                          alt={product.name}
                          style={{ width: "50px" }}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No products added for this brand.</p>
              )}
            </div>
          ))
        )}
           {/* Edit Brand Modal */}
           {editingBrand && (
  <div>
    <h3>Edit Brand</h3>
      <input type="text" name="editBrandName" value={editingBrand?.name || ""} onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })} />
      <input type="file" name="editBrandImage" onChange={(e) => setEditingBrand({ ...editingBrand, image: e.target.files[0] })} />
      <button onClick={editBrand}>Save Changes</button>
      <button onClick={() => setEditingBrand(null)}>Cancel</button>
  </div>
)}
{editingProduct && (
  <div>
    <h3>Edit Product</h3>
      <input type="text" name="editProductName" value={editingProduct?.name || ""} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
      <input type="number" name="editProductPrice" value={editingProduct?.price || ""} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} />
      <input type="text" name="editProductDiscount" value={editingProduct?.discount || ""} onChange={(e) => setEditingProduct({ ...editingProduct, discount: e.target.value })} />
      <input type="number" name="editProductQuantity" value={editingProduct?.quantity || ""} onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })} />
      <input type="file" name="editProductImage" onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.files[0] })} />
      <button onClick={editProduct}>Save Changes</button>
      <button onClick={() => setEditingProduct(null)}>Cancel</button>
  </div>
)}


      </div>
    </div>
  );
}
