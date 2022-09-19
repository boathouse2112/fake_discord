import { ComponentMeta, StoryFn } from '@storybook/react';
import Button, { ButtonProps } from '../components/Button';
import dark from '../theme/dark';
import light from '../theme/light';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Button>;

// Lets us use a button toggle to switch themes, rather than a theme object.
type TemplateType = Omit<ButtonProps, 'theme'> & { theme: 'light' | 'dark' };

const Template: StoryFn<TemplateType> = (args) => {
  const theme = args.theme === 'light' ? light : dark;
  const newArgs = { ...args, theme: theme.button };
  return <Button {...newArgs} />;
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  theme: 'dark',
  label: 'PRIMARY BUTTON',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  theme: 'dark',
  label: 'Secondary button',
};
