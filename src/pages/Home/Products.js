import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products , setProducts] =useState([])
  const [inputId , setInputId] =useState(null)
  const [productQuantity , setProductQuantity] =useState(0)
 
  useEffect(() => {
    fetch('https://revvings-server.up.railway.app/products')
    .then(res => res.json())
    .then(data =>setProducts(data))
  },[])
 const product = products.find(product => product?.id == inputId)
//  console.log(product);
const subtotal = productQuantity * product?.unit
const singleProduct = (e) => {
    e.preventDefault()
    const id = inputId;
    const description = product?.description;
    const unit = product?.unit;
    const quantity = productQuantity;
    const sub = subtotal;
  const data = {id, description, unit, quantity, sub}

    // console.log(data)
if(product){
  const url = `https://revvings-server.up.railway.app/product`
  fetch(url,{
      method: 'POST',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result=> {
    e.target.reset()
 
  })
}
}

    return (
     <div  >
           <Box
          component="form"
          onSubmit={singleProduct}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate 
          marginTop={ '20px'}
          autoComplete="off"
        >
          <div>
            <TextField
             type="number"
              required
           
              onChange={(e) => setInputId(e.target.value)}
              label="Product Id"
             
            />
           
            <TextField
              id="outlined-read-only-input"
             placeholder='Description'
              value={product?.description}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="outlined-read-only-input"
              value={product?.unit}
              placeholder='Unit Price'
              InputProps={{
                readOnly: true,
              }}
            />
              <TextField
             type="number"
              required
              label="Quantity"
              
              onChange={(e) => setProductQuantity(e.target.value)}
            />
           <TextField
              label="Subtotal"
              value={productQuantity ? subtotal : '' }
            
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <Button type="submit" variant="outlined" color="primary">Submit</Button>
       
        </Box>
     </div>
      );
};

export default Products;