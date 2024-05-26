import React,{ useEffect,useState } from "react";
import styled from "styled-components";
import { useParams, NavLink } from "react-router-dom";
import PageNavigation from "../components/PageNavigation";
import MyImage from "../components/MyImage";
import { Container } from "../styles/Container";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace, TbMinus,TbPlus } from "react-icons/tb";
import Star from "../components/Star";
import AddToCart from "../components/AddToCart";
import { Button } from "../styles/Button";
import { useDispatch, useSelector } from "react-redux";
import  {addToCart}  from "../store/addToCart";
const SingleProduct = () => {
  const [color,setColor] = useState('');
  const [colors,setColors] = useState([])
  const [singleProduct,setSingleProduct] = useState([])
  const { id } = useParams();
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch()
  const handleDecrement = () => {
    amount > 1
      ? setAmount((prevAmount) => prevAmount - 1)
      : setAmount((prevAmount) => prevAmount);
  };

  const handleIncrement = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };
  const addItem = (id, title, images, color, price,quantity) => {
    try {
      dispatch(addToCart({id, title, images, color, price,quantity}));
    } catch (error) {
      console.log(error);
    }
  };
  const {
    id: alias,
    articleNo,
    category,
    company,
    description,
    featured,
    images,
    price,
    title,
    stars,
    reviews,
    stock
  } = singleProduct;

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/getAllProducts/${id}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log(data);
          setSingleProduct(data);
          setColors(data.colors)
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    }, []);

  // if (isSingleLoading) {
  //   return <div className="page_loading">Loading.....</div>;
  // }
// console.log(colors)
  return (
    <Wrapper>
      {/* <PageNavigation title={title} /> */}
      <Container className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <MyImage imgs={images} />
          </div>

          {/* product dAta  */}
          <div className="product-data">
            <h2>{title}</h2>
            <Star stars={3.5} reviews={6} />

            {/* <p className="product-data-price">
              MRP:
              <del>
                <FormatPrice price={price} />
              </del>
            </p> */}
            <p className="product-data-price product-data-real-price">
              Deal of the Day: {price}
            </p>
            <p>{description}</p>
            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>1 Year Warranty </p>
              </div>
            </div>

            <div className="product-data-info">
              {/* <p>
                Available:
                <span> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p> */}
              <p>
                ArticleNo : <span> {articleNo} </span>
              </p>
              <p>
                Brand :<span> {company} </span>
              </p>
            </div>
            <hr />
            <div className="colors">
              <p>Color:</p>

              {colors.map((curColor, index) => (
                <button
                  key={index}
                  style={{
                    backgroundColor: curColor,
                    width: 50,
                    height: 50,
                    margin: 10,
                  }}
                  className={
                    color === curColor ? "btnStyle active" : "btnStyle"
                  }
                  onClick={() => setColor(curColor)}
                >
                  {color === curColor ? "☑" : null}
                </button>
              ))}
              {/* {colors.map((curColor, index) => {
                  return (
                    <button
                      key={index}
                      style={{ backgroundColor: curColor,width:50,height:50,margin:10 }}
                      className={
                        color === curColor ? "btnStyle active" : "btnStyle"
                      }
                      onClick={() => setColor(curColor)}
                    >
                      {color === curColor ? (
                        '☑'
                      ) : null}
                    </button>
                    
                    // <p>{curColor}</p>
                  )
                })} */}
              {/* <div className="cart-button">
                <div className="amount-toggle">
                  <button onClick={handleDecrement}>
                    <TbMinus />
                  </button>
                  <div className="amount-style">{amount}</div>
                  <button onClick={handleIncrement}>
                    <TbPlus />
                  </button>
                </div>
              </div> */}
            </div>
            <NavLink
              to={{
                pathname: "/cart",
              }}
            >
              <Button
                className="btn"
                onClick={() => addItem(id, title, images[0], color, price,amount)}
              >
                Add To Cart
              </Button>
            </NavLink>
            {/* <Button onClick={<AddToCart product={singleProduct} />}>
              Add To Cart
            </Button> */}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;

export default SingleProduct;
