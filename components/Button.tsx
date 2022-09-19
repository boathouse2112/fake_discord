import { ButtonTheme } from '../theme/theme';

type ButtonProps = {
  /**
   * What kind of button?
   */
  variant: 'primary' | 'secondary';

  /**
   * What theme is applied?
   */
  theme: ButtonTheme;

  /**
   * The text of the button
   */
  label: string;

  /**
   * Click handler
   */
  onClick?: () => void;
};

const primaryButtonStyle = (buttonTheme: ButtonTheme) => `
  button {
    background-color: ${buttonTheme.backgroundColor};
    color: ${buttonTheme.textColor};
  }
  button:hover {
    background-color: ${buttonTheme.hoverColor};
  }
`;

const secondaryButtonTheme = () => `
  button {
    background-color: transparent;
  }
  button:hover {
    text-decoration-line: underline;
  }
`;

const Button = ({ variant, theme, label, onClick }: ButtonProps) => {
  const variantStyle =
    variant === 'primary' ? primaryButtonStyle(theme) : secondaryButtonTheme();

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

          font-weight: 500;
          letter-spacing: -0.025em;

          cursor: pointer;
        }
        button:hover {
          text-decoration-line: underline;
        }
      `}</style>
      <style jsx>{variantStyle}</style>
    </>
  );
};

export type { ButtonProps };
export default Button;
