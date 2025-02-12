import React, { useId } from "react";

const Input = ({ label, htmlFor, type = "text" }) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={htmlFor}>{label} : </label>
      <input type={type} id={id} className="border-1" />
    </div>
  );
};

export default Input;
