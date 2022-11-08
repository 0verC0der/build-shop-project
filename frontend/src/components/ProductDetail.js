import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import {
  selectedProduct, 
  removeSelectedProduct
} from '../redux/actions/productActions'

const ProductDetails = () => {
  const product = useSelector((state) => state.product);
  const {img, title, price, description} = product;
  const { id } = useParams();
  const dispatch = useDispatch();

    const fetchProductDetail = async () => {
        const response = await axios
        .get(`http://localhost:4444/catalogue/${id}`).catch(err => {
          console.log("Error:", err)
        });

        dispatch(selectedProduct(response.data));

    };
    useEffect(() => {
      if(id && id !== "") fetchProductDetail();
      return () => {
        dispatch(removeSelectedProduct())
      }
    
    }, [id]);

    console.log(product);

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={`http://localhost:4444/upload/${img}`} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails