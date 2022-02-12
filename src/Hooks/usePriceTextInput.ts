import {useState} from 'react';

export default function (initialValue: string) {
  const [text, setText] = useState(initialValue);
  const textChangeHandler = (newText: string) => {
    newText = newText.replace(/[^0-9]/g, '');
    if (newText[0] == '0') return;
    setText(newText);
  };
  return [text, textChangeHandler] as const;
}
