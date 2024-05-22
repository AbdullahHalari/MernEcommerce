import React, { useState } from "react";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import FormatPrice from "../helper/formatPrice";
import { useDispatch, UseDispatch } from "react-redux";
import { removeToCart } from "../store/addToCart";
const CartItem = ({ id, title, images, color, price, quantity }) => {

   const [amount, setAmount] = useState(quantity);
  const dispatch = useDispatch();
   const handleDecrement = () => {
     amount > 1
       ? setAmount((prevAmount) => prevAmount - 1)
       : setAmount((prevAmount) => prevAmount);
   };

   const handleIncrement = () => {
     setAmount((prevAmount) => prevAmount + 1);
   };
   function remove(){
    dispatch(removeToCart({id:id}))
   }
  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img
              src={`http://localhost:5000/uploads/${images.filename}`}
              alt={id}
            />
          </figure>
        </div>
        <div>
          <p>{title}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </div>

      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>
      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={handleDecrement}
        setIncrease={handleIncrement}
      />
      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
       
      </div>
      <div>
        <FaTrash className="remove_icon" onClick={remove}/>
      </div>
    </div>
  );
};

export default CartItem;
