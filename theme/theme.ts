type ButtonTheme = {
  backgroundColor: string;
  hoverColor: string;
  textColor: string;
};

type InputBoxTheme = {
  wrapperBackgroundColor: string;
  backgroundColor: string;
  placeholderColor: string;
  textColor: string;
  iconColor: string;
};

type Theme = {
  button: ButtonTheme;
  inputBox: InputBoxTheme;
};

export type { ButtonTheme, InputBoxTheme, Theme };
