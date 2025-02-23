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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Admin Panel - Manage Brands</h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* Add Brand Button */}
      <button onClick={() => setShowBrandModal(true)}>Add Brand</button>

      {showBrandModal && (
        <div>
          <input type="text" placeholder="Brand Name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          <input type="file" onChange={(e) => setBrandImage(e.target.files[0])} />
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
          <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <input type="number" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          <input type="text" placeholder="Discount" value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)} />
          <input type="number" placeholder="Quantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
          <input type="file" onChange={(e) => setProductImage(e.target.files[0])} />
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
      </div>
    </div>
  );
}
