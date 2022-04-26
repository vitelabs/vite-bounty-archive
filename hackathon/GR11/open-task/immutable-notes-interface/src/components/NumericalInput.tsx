// fork of https://github.com/Uniswap/uniswap-interface/blob/main/src/components/NumericalInput/index.tsx

import React from 'react';

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export const NumericalInput = React.memo(
  ({
    value,
    onUserInput,
    maxDecimals = 0,
    placeholder,
    ...rest
  }: {
    value: string | number;
    onUserInput: (input: string) => void;
    maxDecimals?: number;
  } & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) => {
    return (
      <input
        {...rest}
        value={value}
        onChange={(event) => {
          const nextUserInput = event.target.value.replace(/,/g, '');
          if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
            const index = nextUserInput.indexOf('.');
            const numDecimals = index === -1 ? 0 : nextUserInput.length - index - 1;
            if (numDecimals <= maxDecimals) {
              onUserInput(nextUserInput);
            }
          }
        }}
        // universal input options
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        // text-specific options
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={placeholder || '0.0'}
        minLength={1}
        maxLength={79}
        spellCheck="false"
      />
    );
  }
);

export default NumericalInput;
