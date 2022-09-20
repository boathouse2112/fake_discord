import { ComponentMeta, StoryFn } from '@storybook/react';
import {
  default as ServerListComponent,
  ServerListProps,
} from '../components/ServerList';
import dark from '../theme/dark';
import light from '../theme/light';

export default {
  title: 'ServerList',
  argTypes: {
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof ServerListComponent>;

type TemplateType = Omit<ServerListProps, 'theme'> & {
  theme: 'light' | 'dark';
};

const Template: StoryFn<TemplateType> = (args) => {
  const theme = args.theme === 'light' ? light : dark;
  const newArgs = { ...args, theme: theme.serverList };
  return <ServerListComponent {...newArgs} />;
};

export const ServerList = Template.bind({});
ServerList.args = {
  theme: 'dark',
  serverLinks: [
    { id: '0', name: 'A' },
    { id: '1', name: 'B' },
    { id: '2', name: 'C' },
    { id: '3', name: 'D' },
    { id: '4', name: 'E' },
  ],
};
