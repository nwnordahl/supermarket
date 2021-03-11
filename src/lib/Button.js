import React from "react";
import clsx from "clsx";

export default function Button(props) {
  const { children, outline, className, ...rest } = props;
  const classNames = clsx(
    "btn",
    outline ? "btn-default" : "btn-outline",
    className
  );
  return (
    <button
      outline={outline ? "true" : "false"}
      className={classNames}
      {...rest}
    >
      {children}
    </button>
  );
}
