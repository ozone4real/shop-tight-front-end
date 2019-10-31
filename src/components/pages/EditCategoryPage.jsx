import React from 'react';
import CategoryForm from '../ui-molecules/CategoryForm'

export default ({ match: {params} }) => (
  <main className="add-category-page">
    <div className="container">
      <div className="category-form-container">
      <h3>Edit Category</h3>
  <CategoryForm params={params} />
  </div>
  </div>
  </main>
)