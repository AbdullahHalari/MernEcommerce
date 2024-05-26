import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { Button } from "../styles/Button";
import { useEffect, useState } from "react";
import FormatPrice from "../helper/formatPrice";
import { useDispatch } from "react-redux";

import {
  setCompanyFilter,
  setPriceFilter,
  setColorFilter,
  setCategoryFilter,
} from "../store/filter";
const FilterSection = () => {
  // get the unique values of each property
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState([]);
  const [price, setPrice] = useState(0);
  const [company, setCompany] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/getAllProducts"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });

    if (attr === "colors") {
      // console.log((newVal = [...new Set([].concat(...newVal))]));
      return (newVal = [...new Set([].concat(...newVal))]);
      // newVal = newVal.flat();
    }

    return (newVal = ["all", ...new Set(newVal)]);
  };

  // we need to have the individual data of each in an array format
  const categoryData = getUniqueData(products, "category");
  const companyData = getUniqueData(products, "company");
  const colorsData = getUniqueData(products, "colors");
  // console.log(
  //   "🚀 ~ file: FilterSection.js ~ line 23 ~ FilterSection ~ companyData",
  //   colorsData
  // );

  return (
    <Wrapper>
      <div className="filter-search">
        {/* <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            // value={text}
            // onChange={updateFilterValue}
          />
        </form> */}
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryData.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem}
                className={curElem === category ? "active" : ""}
                onClick={(e) => dispatch(setCategoryFilter(e.target.value))}
              >
                {curElem}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>

        <form action="#">
          <select
            name="company"
            id="company"
            className="filter-company--select"
            value={company}
            onChange={(e) => {
              dispatch(setCompanyFilter(e.target.value));
              setCompany(e.target.value);
            }}
          >
            {companyData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="company">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <div className="filter-colors colors">
        <h3>Colors</h3>

        {/* <div className="filter-color-style">
          <select
            name="color"
            id="color"
            style={{ backgroundColor: color,padding:10 }}
            className="filter-color--select"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              console.log(color);
            }}
          >
            <option value="">Select a color</option>
            {colorsData.map((curColor, index) => (
              <option
                key={index}
                value={curColor}
                style={{ backgroundColor: curColor,padding:10 }}
              >
                <button
                  type="button"
                  value={color}
                  name="color"
                  style={{ backgroundColor: color }}
                  className={`btnStyle ${color ? "active" : ""}`}
                  onClick={(e) => {
                    setColor(e.target.value);
                    console.log(color);
                  }}
                >
                  {color && <FaCheck className="checkStyle" />}
                </button>
              </option>
            ))}
          </select>
        </div> */}
        {colorsData.map((curColor, index) => (
          <button
            key={index}
            type="button"
            value={curColor}
            name="color"
            style={{ backgroundColor: curColor }}
            className={
              color.includes(curColor) ? "btnStyle active" : "btnStyle"
            }
            onClick={(e) => {
              {
                color.includes(curColor)
                  ? setColor(color.filter((c) => c !== curColor))
                  : setColor([...color, e.target.value]);
              }
              dispatch(setColorFilter(curColor));
              console.log(color);
            }}
          >
            {color.includes(curColor) ? (
              <FaCheck className="checkStyle" />
            ) : null}
          </button>
        ))}
      </div>

      <div className="filter_price">
        <h3>Price</h3>
        <h3>
          <FormatPrice price={price} />
        </h3>
        <input
          type="range"
          name="price"
          min={0}
          max={25000}
          value={price}
          onChange={(e) => {
            dispatch(setPriceFilter(e.target.value));
            setPrice(e.target.value);
          }}
        />
      </div>

      <div className="filter-clear">
        <Button
          className="btn"
          onClick={() => {
            // setColor("");
            setCategory("");
            setPrice(0);
            setCompany("");
            dispatch(setCategoryFilter("all"));
            dispatch(setPriceFilter(0));
            dispatch(setCompanyFilter("all"));
          }}
        >
          Clear Filters
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
