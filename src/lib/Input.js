import React from "react";
import clsx from "clsx";

export default function Input(props) {
  const { placeholder, type = "text", className, required, ...rest } = props;

  const classNames = clsx("input", className);

  return (
    <label className="label">
      {placeholder}
      {required && <span className="input-required">*</span>}
      <div>
        <input
          required={required}
          type={type}
          placeholder={placeholder}
          className={classNames}
          {...rest}
        />
      </div>
    </label>
  );
}
