type ButtonTheme = {
  backgroundColor: string;
  hoverColor: string;
  textColor: string;
};

type MessageGroupTheme = {
  dateTimeColor: string;
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
  messageGroup: MessageGroupTheme;
};

export type { ButtonTheme, InputBoxTheme, MessageGroupTheme, Theme };
