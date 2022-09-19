import { Theme } from './theme';

// I don't care if this doesn't follow the normal x00 color numbering scheme.

const backgroundPalette = {
  '100': 'rgb(32 34 37)', // server list background
  '200': 'rgb(38 40 43)', // user panel background
  '300': 'rgb(47 49 54)', // channel list background
  '400': 'rgb(51 53 58)', // message view hovered background
  '500': 'rgb(55 57 63)', // message view background
  '600': 'rgb(64 68 75)', // input box background
  '700': 'rgb(66 70 78)', // channel list selected channel background
};

const textPalette = {
  '100': 'rgb(79 84 93)', // muted channel name
  '200': 'rgb(113 118 125)', // input box placeholder text
  '300': 'rgb(150 152 158)', // channel name
  '400': 'rgb(162 166 170)', // message datetime
  '500': 'rgb(185 187 190)', // normal icon
  '600': 'rgb(220 221 222)', // normal text
  '700': 'rgb(255 255 255)', // white
};

const button = {
  backgroundColor: 'rgb(87 101 242)',
  hoverColor: 'rgb(71 82 196)',
  textColor: 'rgb(250 250 250)',
};

const inputBox = {
  wrapperBackgroundColor: backgroundPalette['600'],
  backgroundColor: backgroundPalette['500'],
  placeholderColor: textPalette['200'],
  textColor: textPalette['600'],
  iconColor: textPalette['500'],
};

const dark: Theme = {
  button: button,
  inputBox: inputBox,
};

export default dark;
