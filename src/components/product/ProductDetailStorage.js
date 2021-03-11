import React from "react";

export default function ProductDetailStorage({ details }) {
  const { storage } = details;

  return (
    <p>
      <strong>Storage instructions:</strong> {storage}
    </p>
  );
}
