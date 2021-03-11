import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Button from "../../lib/Button";

export default function ProductDetailInfo({ details }) {
  const app = useContext(AppContext);
  const { description, price } = details;

  return (
    <>
      <p>
        {description} sold at <strong>${price}</strong> per piece.
      </p>
      <Button onClick={() => app.onProductAdd(details)}>${price}</Button>
    </>
  );
}
