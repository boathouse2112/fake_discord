import React from "react";

const ActionButton: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={
        "bg-indigo-600 px-5 py-2 rounded cursor-pointer " +
        "text-neutral-50 font-medium tracking-tight hover:bg-indigo-700"
      }
    >
      {children}
    </button>
  );
};

export default ActionButton;
