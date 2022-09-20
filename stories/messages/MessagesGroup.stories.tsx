import { ComponentMeta, StoryFn } from '@storybook/react';
import { addDays } from 'date-fns/esm';
import {
  default as MessageGroupComponent,
  MessageGroupProps,
} from '../../components/messages/MessageGroup';
import dark from '../../theme/dark';
import light from '../../theme/light';

export default {
  title: 'MessageGroup',
  argTypes: {
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof MessageGroupComponent>;

type TemplateType = Omit<MessageGroupProps, 'theme'> & {
  theme: 'light' | 'dark';
};

const Template: StoryFn<TemplateType> = (args) => {
  const theme = args.theme === 'light' ? light : dark;
  const newArgs = { ...args, theme: theme.messageGroup };
  return <MessageGroupComponent {...newArgs} />;
};

export const MessageGroup = Template.bind({});
MessageGroup.args = {
  theme: 'dark',
  author: {
    id: '',
    name: 'Barbara',
    avatarPath: '',
    conversationIds: [],
    interlocutorIds: [],
  },
  messages: [
    {
      authorId: '',
      id: '',
      time: addDays(new Date(), -1),
      content: {
        type: 'text',
        text:
          'What they meant was, "Sorry it\'s taken us 10 years to show off our next game ' +
          'while releasing barely any major content in the games we promised to keep updating, anyway back to work!"',
      },
    },
    {
      authorId: '',
      id: '',
      time: addDays(new Date(), -1),
      content: {
        type: 'text',
        text: 'Swinging by home before i come',
      },
    },
  ],
  time: addDays(new Date(), -1),
};
