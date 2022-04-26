// fork of https://github.com/Uniswap/uniswap-interface/blob/main/src/components/TextInput/index.tsx

import React, { useMemo, useCallback } from 'react';

type Props = React.HTMLProps<HTMLTextAreaElement | HTMLInputElement> & {
  textarea?: boolean;
  value: string;
  onUserInput: (value: string) => void;
  onMetaEnter?: () => void;
};

const TextInput = ({ textarea, value, onUserInput, onMetaEnter, ...rest }: Props) => {
  const handleInput = useCallback(
    (event) => {
      onUserInput(event.target.value);
    },
    [onUserInput]
  );
  const Tag = useMemo(() => (textarea ? 'textarea' : 'input'), [textarea]);

  return (
    // @ts-ignore
    <Tag
      {...rest}
      type="text"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      onChange={handleInput}
      value={value}
      onKeyDown={(e) => {
        if (onMetaEnter && e.metaKey && e.code === 'Enter') {
          e.preventDefault();
          onMetaEnter();
        }
      }}
    />
  );
};

export default TextInput;
