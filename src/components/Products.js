import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Loader from "./misc/Loader";
import Product from "./product/Product";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const { get, loading } = useFetch(
    "https://react-tutorial-demo.firebaseio.com/"
  );

  useEffect(() => {
    get("supermarket.json")
      .then((data) => {
        if (data) {
          setProducts(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="products-layout">
      <h1>Products</h1>
      <p>Take a look at our products</p>
      <div className="products-grid">
        {products.map((product) => {
          return (
            <Product
              key={product.id}
              details={product}
              cart={props.cart}
              onProductAdd={props.onProductAdd}
              onProductDelete={props.onProductDelete}
            />
          );
        })}
      </div>
      {loading && <Loader />}
    </div>
  );
}
