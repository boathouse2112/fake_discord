type ButtonProps = {
  /**
   * What background color to use
   */
  backgroundColor?: string;

  /**
   * What hover color to use
   */
  hoverColor?: string;

  /**
   * The color of the text
   */
  textColor?: string;

  /**
   * The text of the button
   */
  label: string;

  /**
   * Click handler
   */
  onClick?: () => void;
};

const Button = ({
  backgroundColor,
  hoverColor,
  textColor,
  label,
  onClick,
}: ButtonProps) => {
  const styleBackgroundColor = backgroundColor
    ? backgroundColor
    : 'transparent';
  const styleHoverColor = hoverColor ? hoverColor : styleBackgroundColor;

  return (
    <>
      <button onClick={onClick}>{label}</button>
      <style jsx>{`
        button {
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-radius: 0.25rem;
          border: none;

          background-color: ${styleBackgroundColor};

          font-weight: 500;
          letter-spacing: -0.025em;
          color: ${textColor};

          cursor: pointer;
        }
        button:hover {
          background-color: ${styleHoverColor};
          text-decoration-line: underline;
        }
      `}</style>
    </>
  );
};

export default Button;
