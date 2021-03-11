import React, { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import { useRouteMatch } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../lib/Button";

const price_id = [
  "price_1ITP0gFsG74fuDA3LmUrCRIa",
  "price_1ITP24FsG74fuDA3IzbRVet8",
  "price_1ITP2bFsG74fuDA3uN2OVcRF",
  "price_1ITP3fFsG74fuDA3CzMyu9Gz",
];

const stripeLoadedPromise = loadStripe(
  "pk_test_51ITD5QFsG74fuDA3OWP2Zn8UAOYUjJirNtlGGthXFNY069asp1YdOANRSWgGUkrUm5r0R1fulKHXOU3ciSlsCvzc00pehioWJe"
);

export default function Cart(props) {
  const match = useRouteMatch();
  const app = useContext(AppContext);
  const cart = app.cart;

  const totalCart = app.getTotalCart();

  const lineItems = app.getLineItems(price_id);

  function handleButtonClick() {
    stripeLoadedPromise.then((stripe) => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: `http://localhost:3000${match.url}`,
          cancelUrl: `http://localhost:3000${match.url}`,
        })
        .then((response) => {
          console.log(response.error);
        })
        .catch((error) => console.log(error));
    });
  }

  return (
    <div className="cart-layout">
      <div>
        <h1>Your Cart</h1>
        {cart.length === 0 && (
          <p>You have not added any product to your cart yet.</p>
        )}
        {cart.length > 0 && (
          <table className="table table-cart">
            <thead>
              <tr>
                <th width="25%" className="th-product">
                  Product
                </th>
                <th width="25%">Unit price</th>
                <th width="10%">Quantity</th>
                <th width="25%">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.image}
                        width="30"
                        height="30"
                        alt={product.name}
                      />
                      {product.name}
                    </td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <strong>${product.quantity * product.price}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="2"></th>
                <th className="cart-highlight">Total</th>
                <th className="cart-hightlight">${totalCart}</th>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
      {cart.length > 0 && (
        <Button outline onClick={handleButtonClick}>
          Pay
        </Button>
      )}
    </div>
  );
}
