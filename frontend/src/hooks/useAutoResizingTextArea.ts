import { useState, useRef, useEffect } from "react";

type UseTextAreaProps = {
    lineLimit: number;
};

export type UseAutoResizingTextArea = {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    rows: number;
    isMaxedOut: boolean;
    handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
};
  
export const useAutoResizingTextArea = ({ lineLimit }: UseTextAreaProps): UseAutoResizingTextArea => {
const [text, setText] = useState('');
const [rows, setRows] = useState(1);
const [isMaxedOut, setIsMaxedOut] = useState(false);
const textAreaRef = useRef<HTMLTextAreaElement>(null);

const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isMaxedOut) return;

    const inputText = e.target.value;
    const lineCount = inputText.split('\n').length;

    if (lineCount <= lineLimit) {
    setText(inputText);
    setRows(lineCount);
    } else {
    setIsMaxedOut(true);
    }
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const lineCount = text.split('\n').length;

    if (lineCount >= lineLimit && e.key === 'Enter') {
    e.preventDefault();
    }
};

const autoResize = () => {
    if (textAreaRef.current) {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
};

useEffect(() => {
    autoResize();
}, [text]);

return {
    text,
    setText,
    rows,
    isMaxedOut,
    handleInput,
    handleKeyDown,
    textAreaRef,
};
};
  