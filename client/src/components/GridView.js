import React from "react";
import styled from "styled-components";
import Product from "./Product";
import { useSelector } from "react-redux";
const GridView = ({ products }) => {
  // console.log(products )
   const { company, price, colors, category } = useSelector(
     (state) => state.filter
   );
   console.log(company, price, colors, category);
 const filteredProducts = products.filter(
   (product) =>
     (company == "all" || product.company === company) &&
     (price == 0 || product.price <= parseFloat(price)) &&
     (colors.length == 0 | product.colors.some(color => colors.includes(color)))&&
     (category == "all" || product.category === category)
 );
 console.log(
   filteredProducts,products.filter((product) =>
     product.colors.some((color) => colors.includes(color))
   )
 );
  return (
    <Wrapper className="section">
        <div className=" grid grid-three-column">
          {filteredProducts.map((curElem) => {
            return <Product key={curElem.id} {...curElem} />;
          })}
        </div>
  
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;

  .container {
    max-width: 120rem;
  }

  .grid {
    gap: 3.2rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgb(252 108 133 / 57%);
      transition: all 0.3s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }
  }

  .card {
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;

    .card-data {
      padding: 0 1rem;
    }

    .card-data-flex {
      flex-direction: column;
      margin: 2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(252, 108, 133);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(252, 108, 133);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(252, 108, 133);
        font-size: 1.4rem;
      }
    }
  }
`;

export default GridView;
