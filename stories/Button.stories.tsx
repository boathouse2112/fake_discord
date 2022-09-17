import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'PRIMARY BUTTON',
  backgroundColor: 'rgb(87 101 242)',
  hoverColor: 'rgb(71 82 196)',
  textColor: 'rgb(250 250 250)',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary button',
  backgroundColor: undefined,
};
