import React, { useEffect, useState } from 'react';
import {
  fetchProducts,
  addProduct,
  recordSale,
  getLowStock,
  getAnalytics,
} from './services/api';
import './styles.css';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: 0, price: 0 });
  const [sale, setSale] = useState({ product_id: '', quantity_sold: 0 });
  const [lowStock, setLowStock] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    loadProducts();
    loadLowStock();
    loadAnalytics();
  }, []);

  const loadProducts = async () => {
    const res = await fetchProducts();
    setProducts(res.data);
  };

  const loadLowStock = async () => {
    const res = await getLowStock();
    setLowStock(res.data);
  };

  const loadAnalytics = async () => {
    const res = await getAnalytics();
    setAnalytics(res.data);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || newProduct.quantity <= 0 || newProduct.price <= 0) return;
    await addProduct(newProduct);
    setNewProduct({ name: '', quantity: 0, price: 0 });
    loadProducts();
    loadLowStock();
    loadAnalytics();
  };

  const handleRecordSale = async () => {
    if (!sale.product_id || sale.quantity_sold <= 0) return;
    await recordSale(sale);
    setSale({ product_id: '', quantity_sold: 0 });
    loadProducts();
    loadLowStock();
    loadAnalytics();
  };

  return (
    <div className="container">
      <h1>Smart Inventory Tool</h1>

      <section>
        <h2>Add Product</h2>
        <input
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Price (€)"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </section>

      <section>
        <h2>Product List</h2>
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} - Qty: {p.quantity} @ €{p.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Record Sale</h2>
        <select
          onChange={(e) => setSale({ ...sale, product_id: Number(e.target.value) })}
          value={sale.product_id}
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity Sold"
          value={sale.quantity_sold}
          onChange={(e) => setSale({ ...sale, quantity_sold: Number(e.target.value) })}
        />
        <button onClick={handleRecordSale}>Record Sale</button>
      </section>

      <section>
        <h2>Low Stock Alerts</h2>
        <ul>
          {lowStock.map((item) => (
            <li key={item.id}>
              {item.name} — Only {item.quantity} left!
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Analytics</h2>
        <p>Total Inventory Value: €{analytics.total_inventory_value?.toFixed(2)}</p>
        <p>Total Sales: {analytics.total_sales}</p>
      </section>
    </div>
  );
}

export default App;
