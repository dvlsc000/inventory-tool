import React from 'react';
import './ProductList.css'; // Optional for custom styles

function ProductList({ products }) {
  return (
    <section>
      <h2>Product List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price (€)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className={p.quantity < 5 ? 'low-stock' : ''}>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>€{p.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ProductList;
