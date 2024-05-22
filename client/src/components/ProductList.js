import React,{useEffect,useState} from "react";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
 const [all_products, setProducts] = useState([]);

 useEffect(() => {
   const fetchProducts = async () => {
     try {
       const response = await fetch("http://localhost:5000/api/getAllProducts");
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }

       const data = await response.json();
       console.log(data)
       setProducts(data);
     } catch (error) {
       console.error("Error fetching products:", error);
     }
   };

   fetchProducts();
 }, []);

//   if (grid_view === true) {
    return( <GridView products={all_products} />)
//   }

//   if (grid_view === false) {
//     return <ListView products={all_products} />;
//   }
};

export default ProductList;
