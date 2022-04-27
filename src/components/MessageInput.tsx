import React, { useState } from 'react';
import { MessageContentData, TextContentData } from '../types';

const MessageInput = (props: {
  submitMessage: (content: MessageContentData) => void;
}) => {
  const [state, setState] = useState('');

  // On change, update message input state.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.currentTarget.value);
  };

  // On (non-shift) enter, submit the input form.
  const onEnterPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  // On submit, call submitMessage prop, and clear message input.
  const handleSubmit = () => {
    const content: TextContentData = { type: 'text', text: state };
    props.submitMessage(content);

    setState('');
  };

  return (
    <div className="p-4 bg-neutral-600">
      <input
        className="w-full h-12 px-4 rounded-md bg-neutral-400 outline-none text-white"
        type="text"
        value={state}
        onChange={handleChange}
        onKeyDown={onEnterPress}
      ></input>
    </div>
  );
};

export default MessageInput;
