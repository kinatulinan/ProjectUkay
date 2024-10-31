import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function SellProductPage() {
  const [formData, setFormData] = useState({
    sellProductName: '',
    sellProductType: '',
    sellProductPrice: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/sell/post', formData);
      console.log('Product added:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className='form-Design'>
      <h1 className='sell-Title'>Sell A Product</h1>
      <form onSubmit={handleSubmit}>
        <label className='label-adjust' htmlFor='sellProductName'>Product Name</label>
        <input
          className='Sell-Data'
          type='text'
          id='sellProductName'
          placeholder='Product Name here'
          value={formData.sellProductName}
          onChange={handleInputChange}
        />

        <label className='label-adjust' htmlFor='sellProductType'>Product Type</label>
        <input
          className='Sell-Data'
          type='text'
          id='sellProductType'
          placeholder='Product Type here'
          value={formData.sellProductType}
          onChange={handleInputChange}
        />

        <label className='label-adjust' htmlFor='sellProductPrice'>Product Price</label>
        <input
          className='Sell-Data'
          type='number'
          id='sellProductPrice'
          placeholder='Product Price here'
          value={formData.sellProductPrice}
          onChange={handleInputChange}
        />

        <button className='button-Submit' type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default SellProductPage;
