import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../helper/formatPrice";
const Product = (curElem) => {
  const {
    _id,
    title,
    category,
    company,
    articleNo,
    price,
    featured,
    description,
    colors,
    images
  } = curElem;
  return (
    <NavLink to={`/singleproduct/${_id}`}>
      <div className="card">
        <figure>
          <img src={`http://localhost:5000/uploads/${images[0].filename}`} />
          {/* <img src={image} alt={title} /> */}
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{title}</h3>
            <div>
            <p className="card-data--price"><FormatPrice price={price} /></p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
