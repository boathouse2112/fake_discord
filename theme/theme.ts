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

type ServerListTheme = {
  backgroundColor: string;
};

type Theme = {
  button: ButtonTheme;
  inputBox: InputBoxTheme;
  messageGroup: MessageGroupTheme;
  serverList: ServerListTheme;
};

export type {
  ButtonTheme,
  InputBoxTheme,
  MessageGroupTheme,
  ServerListTheme,
  Theme,
};
