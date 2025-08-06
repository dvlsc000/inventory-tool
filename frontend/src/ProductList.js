import React from 'react';

function ProductList({ products }) {
  return (
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
  );
}

export default ProductList;
