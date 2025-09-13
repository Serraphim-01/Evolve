import { useState, useEffect } from 'react';

export const useTypingEffect = (text: string = '', speed: number = 50) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    // If the new text doesn't start with the currently typed text, we need to reset.
    // This handles the case where the `text` prop changes to a new line.
    if (text && !text.startsWith(typedText)) {
        setTypedText('');
    }

    // The typing logic
    if (typedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setTypedText(text.slice(0, typedText.length + 1));
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [typedText, text, speed]);

  return typedText;
};
