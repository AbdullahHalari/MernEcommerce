import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filter_products, grid_view, all_products } = useFilterContext();

  if (grid_view === true) {
    return <GridView products={all_products} />;
  }

  if (grid_view === false) {
    return <ListView products={all_products} />;
  }
};

export default ProductList;
