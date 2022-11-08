import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';


const ProductComponent = () => {
    const products = useSelector((state) => state.allProducts.products);
    const renderList = products.map((product) => {
        const {_id, title, img, price, description} = product;
        return(
        <div className="four wide column" key={_id}>
            <Link to = {`/catalogue/${_id}`}>
                <div className="ui link cards">
                    <div className="card">
                        <div className="image">
                            <img src={`http://localhost:4444/upload/${img}`} alt={title}/>
                        </div>
                            <div className="content">
                                <div className="header">{title}</div>
                                <div className="meta price">₴ {price}</div>
                                <div className="meta">{description}</div>
                            </div>
                    </div>
                </div>
            </Link> 
    </div>)
    })
    return (
    <>{renderList}</>
  )
}

export default ProductComponent