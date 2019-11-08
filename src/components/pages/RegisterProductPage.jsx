import React from 'react';
import ProductForm from '../ui-molecules/ProductForm'

export default ({ history }) => (
  <main className="reg-product-page">
    <div className="container">
      <div className="product-form-container">
        <h2 align="center">Register A Product</h2>
        <ProductForm history={history} />
      </div>
    </div>
  </main>
)