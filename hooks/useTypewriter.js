import { useState, useEffect } from 'react';

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const DELAY_BEFORE_DELETE = 1000;

export default function useTypewriter(words = []) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (text.length < words[wordIndex].length) {
        timeout = setTimeout(() => {
          setText(words[wordIndex].substring(0, text.length + 1));
        }, TYPING_SPEED);
      } else {
        timeout = setTimeout(() => setTyping(false), DELAY_BEFORE_DELETE);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(words[wordIndex].substring(0, text.length - 1));
        }, DELETING_SPEED);
      } else {
        setTyping(true);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, typing, wordIndex, words]);

  return text;
}
