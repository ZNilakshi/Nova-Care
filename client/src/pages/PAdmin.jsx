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
      <div style={{ display: "flex" }}>
        {/* Brands List on the Left */}
        <div style={{ width: "30%", borderRight: "2px solid #ccc", padding: "10px" }}>
          <h2>Brands</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <ul>
            {brands.length === 0 ? (
              <p>No brands added yet.</p>
            ) : (
              brands.map((brand) => (
                <li key={brand._id} style={{ cursor: "pointer", padding: "5px", borderBottom: "1px solid #ddd" }} onClick={() => setSelectedBrand(brand)}>
                  {brand.name}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Products on the Right */}
        <div style={{ width: "70%", padding: "10px" }}>
          {selectedBrand ? (
            <div>
              <h2>{selectedBrand.name} - Products</h2>
              {selectedBrand.image && (
                <img src={`http://localhost:5000${selectedBrand.image}`} alt={selectedBrand.name} style={{ width: "100px" }} />
              )}
              <button onClick={() => setEditingBrand(selectedBrand)}>Edit</button>
<button onClick={() => deleteBrand(selectedBrand._id)}>Delete</button>

              <ul>
                {selectedBrand.products && selectedBrand.products.length > 0 ? (
                  selectedBrand.products.map((product) => (
                    <li key={product._id} style={{ borderBottom: "1px solid #ddd", padding: "5px" }}>
                      {product.name} - ${product.price} ({product.discount}% off)
                      {product.image && (
                        <img src={`http://localhost:5000${product.image}`} alt={product.name} style={{ width: "50px" }} />
                      )}
                       <button onClick={() => setEditingProduct(product)}>Edit</button>
                       <button onClick={() => deleteProduct(product._id, selectedBrand._id)}>Delete</button>

                    </li>
                  ))
                ) : (
                  <p>No products available for this brand.</p>
                )}
              </ul>
            </div>
          ) : (
            <div>
              
            </div>
          )}
        </div>
      </div>
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