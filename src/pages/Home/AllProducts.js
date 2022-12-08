import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

  
const AllProducts = () => {
    const [allProducts, setAllProducts] =useState([])
  const totalQuantity = allProducts.map(product => parseInt(product.quantity)).reduce((prev, curr) => prev + curr, 0);
  const totalPrice= allProducts.map(item => parseInt(item.sub)).reduce((prev, curr) => prev + curr, 0);
 
    useEffect(() => {
        fetch('http://localhost:5000/all-products')
        .then(res => res.json())
        .then(data =>setAllProducts(data))
      },[allProducts])
      const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure you want to delete?')
        if(proceed){
            const url = `http://localhost:5000/product/${id}`
            fetch(url, {
                method: 'DELETE',
       
            }).then(res => res.json())
            .then(data => {
                console.log(data);
          
            })
        }
       }
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Product ID</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Unit Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Subtotal</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProducts.map((row) => (
            <TableRow
              key={row._id}
           
            >
              <TableCell align="center">
                {row.id}
              </TableCell>
             
              <TableCell align="center">{row.description.slice(0 ,30)}</TableCell>
              <TableCell align="center">{row.unit}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">{row.sub}</TableCell>
            <TableCell align="center">  <IconButton aria-label="delete">
            <DeleteIcon color="error" onClick={() => handleDelete(row._id)} />
      </IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <div>
            <h3 sx={{ fontWeight: 600, color: 'red'  }}>Total Quantity: {totalQuantity} </h3>
            <h3>Total Price: {totalPrice} </h3>
        </div>
    </TableContainer>
    );
};

export default AllProducts;