import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";
import Button from "../../lib/Button";

export default function Product(props) {
  const app = useContext(AppContext);
  const { description, image, name, price, id } = props.details;

  const productFromCart = app.getProductFromCart(id);
  const quantity = productFromCart ? productFromCart.quantity : 0;

  return (
    <div className="product">
      <div className="product-image-container">
        <Link to={`/products/${id}`}>
          <img
            src={image}
            width="100"
            height="100"
            className="product-image"
            alt={name}
          />
        </Link>
        {quantity > 0 && (
          <div className="product-quantity-container">
            <div className="product-quantity">{quantity}</div>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="product-checkout">
        <div>
          <Button
            className="product-delete"
            onClick={() => app.onProductDelete(id)}
          >
            x
          </Button>
        </div>
        <Button onClick={() => app.onProductAdd(props.details)}>
          ${price}
        </Button>
      </div>
    </div>
  );
}
