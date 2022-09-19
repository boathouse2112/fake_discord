import { ComponentMeta, StoryFn } from '@storybook/react';
import {
  default as InputBoxComponent,
  InputBoxProps,
} from '../../components/messages/InputBox';
import dark from '../../theme/dark';
import light from '../../theme/light';

export default {
  title: 'InputBox',
  argTypes: {
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof InputBoxComponent>;

type TemplateType = Omit<InputBoxProps, 'theme'> & { theme: 'light' | 'dark' };

const Template: StoryFn<TemplateType> = (args) => {
  const theme = args.theme === 'light' ? light : dark;
  const newArgs = { ...args, theme: theme.inputBox };
  return <InputBoxComponent {...newArgs} />;
};

export const InputBox = Template.bind({});
InputBox.args = {
  theme: 'dark',
  placeholder: 'Message @Boathouse',
};
