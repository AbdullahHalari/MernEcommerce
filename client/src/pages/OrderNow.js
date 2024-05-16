import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";

const OrderForm = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phoneNumber:"",
    address: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(cart)
    console.log("Customer Details:", customerDetails);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div className="upload-form">
          <div className="form-group">
            {/* <p>Total Amount =  {total_price / 100}</p>
            <p>Shipping Amount = {shipping_fee / 100}</p>
            <p>Total Bill = {(total_price+shipping_fee)/100}</p> */}
          </div>
          <div className="form-group">
            <label htmlFor="title">Name:</label>
            <input
              type="text"
              placeholder="Enter your name  "
              name="name"
              onChange={handleInputChange}
              value={customerDetails.name}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">email:</label>
            <input
              type="text"
              placeholder="Enter your email  "
              name="email"
              onChange={handleInputChange}
              value={customerDetails.email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">phoneNumber:</label>
            <input
              type="text"
              placeholder="Enter your phoneNumber  "
              name="phoneNumber"
              onChange={handleInputChange}
              value={customerDetails.phoneNumber}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">address:</label>
            <input
              type="text"
              placeholder="Enter your address  "
              name="address"
              onChange={handleInputChange}
              value={customerDetails.address}
              required
            />
          </div>
          <Button type="submit">Order Now</Button>
        </div>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .upload-form {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    background-color: #e8e8e8;
  }

  .upload-form h2 {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bolder;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-weight: bold;
  }

  .form-group input[type="text"],
  .form-group textarea {
    /* width: 100%; */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .upload-icon-label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: #007bff;
  }

  .upload-icon {
    margin-right: 10px;
  }

  .form-group input[type="file"] {
    display: none;
  }

  .upload-button {
    background-color: #279bef;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .upload-button:hover {
    background-color: #479cd9;
  }

  .delete-button {
    margin-left: 10px;
  }

  .preview-image {
    margin-left: 10px;
  }

  .file-info {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .file-info p {
    margin: 0;
  }

  .file-info button {
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .file-info button:hover {
    background-color: #e60000;
  }

  .file-preview {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-height: 300px;
    overflow-y: auto;
  }

  .file-info {
    flex: 0 1 calc(25% - 20px);
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  /* -----file type and file format---- */

  .file-info {
    margin-top: 10px;
    padding: 10px;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
  }

  .file-info p {
    margin: 5px 0;
  }

  .file-info strong {
    font-weight: 600;
  }
`;
export default OrderForm;
