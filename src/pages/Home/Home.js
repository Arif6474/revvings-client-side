import React from 'react';
import AllProducts from './AllProducts';
import Navbar from './Navbar';
import Products from './Products';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Products/>
            <AllProducts/>
        </div>
    );
};

export default Home;