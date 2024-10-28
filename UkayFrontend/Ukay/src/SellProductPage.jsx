import React from 'react';
import './App.css';

function SellProductPage(){

    return(
        <>
        
        <div className='form-Design'>
        <h1 className='sell-Title'>Sell A Product</h1>
        <form action='SellProductPage.jsx'>
            
            <label className = 'label-adjust' for = "sellProductName">Product ID</label>
            <input className = "Sell-Data" type="number" id="sellProductName" name="Product Name" placeholder="Product Name here"></input>

            <label className = 'label-adjust' for = "sellProductType">Product Name</label>
            <input className = "Sell-Data" classtype="text" id="sellProductType" name="Product Type" placeholder="Product Type here"></input>

            <label className = 'label-adjust' for = "sellProductType">Product Type</label>
            <input className = "Sell-Data" classtype="text" id="sellProductType" name="Product Type" placeholder="Product Type here"></input>

            <label className = 'label-adjust' for = "sellProductPrice">Product Details</label>
            <input className = "Sell-Data" type="text" id="sellProductPrice" name="Product Price" placeholder="Product Price here"></input>

            <label className = 'label-adjust' for = "sellProductPrice">Product Price</label>
            <input className = "Sell-Data" type="number" id="sellProductPrice" name="Product Price" placeholder="Product Price here"></input>

            <label className = 'label-adjust' for = "sellProductPrice">Product Description</label>
            <input className = "Sell-Data" type="text" id="sellProductPrice" name="Product Price" placeholder="Product Price here"></input>

            <input className = "button-Submit" type="btnSubmit" value="Submit"></input>
        </form>
        </div>
        <hr/>
        
        
        </>


    );
}

export default SellProductPage;