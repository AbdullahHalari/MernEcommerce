import { useEffect } from "react";
import styled from "styled-components";
import { useParams, NavLink } from "react-router-dom";
import { useProductContext } from "../context/productcontex";
import PageNavigation from "../components/PageNavigation";
import MyImage from "../components/MyImage";
import { Container } from "../styles/Container";
import FormatPrice from "../Helpers/FormatPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "../components/Star";
import AddToCart from "../components/AddToCart";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cart_context";

const API = "http://localhost:5000/api/getAllProducts";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();
  const { addToCart } = useCartContext();

  const { id } = useParams();

  const {
    id: alias,
    title,
    articleNo,
    company,
    price,
    description,
    category,
    stock,
    colors,
    stars,
    reviews,
    images,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}/${id}`);
  }, []);

  if (isSingleLoading) {
    return <div className="page_loading">Loading.....</div>;
  }

  return (
    <Wrapper>
      <PageNavigation title={title} />
      <Container className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <MyImage imgs={images} />
          </div>

          {/* product dAta  */}
          <div className="product-data">
            <h2>{title}</h2>
            <Star stars={stars} reviews={reviews} />

            {/* <p className="product-data-price">
              MRP:
              <del>
                <FormatPrice price={price} />
              </del>
            </p> */}
            <p className="product-data-price product-data-real-price">
              Deal of the Day: <FormatPrice price={price} />
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
              <p>
                Available:
                {/* <span> {stock > 0 ? "In Stock" : "Not Available"}</span> */}
              </p>
              <p>
                ArticleNo : <span> {articleNo} </span>
              </p>
              <p>
                Brand :<span> {company} </span>
              </p>
            </div>
            <hr />
            {/* <div className="colors">
        <p>
          Color:
          {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }} */}
                {/* // className={color === curColor ? "btnStyle active" : "btnStyle"}
                // onClick={() => setColor(curColor)} */}
                {/* > */}
                {/* {color === curColor ? <FaCheck className="checkStyle" /> : null} */}
              {/* </button>
            );
          })}
        </p>
      </div> */}
            <NavLink
              to="/cart"
              onClick={() => addToCart(id, colors, 5000, singleProduct)}
            >
              <Button className="btn">Add To Cart</Button>
            </NavLink>
            {/* <Button onClick={<AddToCart product={singleProduct} />}>
              Add To Cart
            </Button> */}
            {/* {<AddToCart product={singleProduct} />} */}
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
`;

export default SingleProduct;
