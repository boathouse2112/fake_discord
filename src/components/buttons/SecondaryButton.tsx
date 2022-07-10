import React from "react";

const SecondaryButton: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={
        "ml-2 px-5 py-2 rounded text-neutral-50 tracking-tight hover:underline"
      }
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
