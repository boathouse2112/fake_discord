import { useState } from 'react';
import { InputBoxTheme } from '../../theme/theme';
import { MessageContent, TextContent } from '../../types';

type InputBoxProps = {
  /**
   * The theme applied
   */
  theme: InputBoxTheme;

  /**
   * The placeholder value of the input box
   */
  placeholder?: string;

  /**
   * The handler for submitting a message
   */
  submitMessage: (content: MessageContent) => void;
};

const InputBox = ({ theme, placeholder, submitMessage }: InputBoxProps) => {
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
    const content: TextContent = { type: 'text', text: state };
    submitMessage(content);

    setState('');
  };

  return (
    <div className="input-box-wrapper">
      <input
        type="text"
        placeholder={placeholder}
        value={state}
        onChange={handleChange}
        onKeyDown={onEnterPress}
      />
      <style jsx>{`
        .input-box-wrapper {
          padding: 1rem;
          background-color: ${theme.backgroundColor};
        }
        input {
          width: 100%;
          height: 3rem;
          padding-left: 1rem;
          padding-right: 1rem;
          border-radius: 0.375rem;

          border: 0;
          outline: 2px solid transparent;
          outline-offset: 2px;

          background-color: ${theme.wrapperBackgroundColor};
          color: ${theme.textColor};
        }
        input::placeholder {
          color: ${theme.placeholderColor};
        }
      `}</style>
    </div>
  );
};

export type { InputBoxProps };

export default InputBox;
