import { Routes, Route } from 'react-router-dom';
import React from 'react'
import ProductsTable from '../pages/ProductForm';
import ProductDetail from '../pages/ProductDetail';

const ApiRouter = () => {
  return (
    <Routes>
      <Route path="/" exact  element={<ProductsTable />} />
      <Route path="/product/:id" component={<ProductDetail/>} />
    </Routes>
  )
}

export default ApiRouter;