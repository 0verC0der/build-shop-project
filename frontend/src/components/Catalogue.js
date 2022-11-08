import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import {setProducts} from '../redux/actions/productActions'
import ProductComponent from './ProductComponent';

const Catalogue = () => {
    const products = useSelector((state) => state);
    const dispatch = useDispatch();
    
        const fetchProducts = async () => {
            const response = await axios.get('http://25.22.42.82:4444/catalogue').catch((err) => {
                console.log("Err", err)
            });
            dispatch(setProducts(response.data));

        };

        useEffect( () => {
            fetchProducts();
        }, []);

        console.log("Products: ", products)

    return (
        <div className='ui grid container'>
            <ProductComponent/>
        </div>
  )
}

export default Catalogue