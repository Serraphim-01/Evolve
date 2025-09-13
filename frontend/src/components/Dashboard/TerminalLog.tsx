import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTypingEffect } from '../../hooks/useTypingEffect';

const TypingIndicator = () => <span className="animate-ping">_</span>;

export const TerminalLog: React.FC = () => {
  const { user } = useAuth();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [linesToRender, setLinesToRender] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  const xpForNextLevel = ((user?.level || 0) + 1) * 150;
  const remainingXp = xpForNextLevel - (user?.xp || 0);

  const allLines = useMemo(() => [
    `Welcome, ${user?.username || 'guest'}.`,
    `> Accessing user data...`,
    `> Level: ${user?.level || 0}`,
    `> XP to next level: ${remainingXp > 0 ? remainingXp : 0}`,
    `> System status: Nominal. Ready for new missions.`
  ], [user, remainingXp]);

  const textToType = linesToRender[currentLineIndex] || '';
  const typedText = useTypingEffect(textToType, 50);

  useEffect(() => {
    if (user) {
        setLinesToRender([allLines[0]]);
    }
  }, [user, allLines]);

  useEffect(() => {
    if (textToType && typedText === textToType) {
      if (currentLineIndex < allLines.length - 1) {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prevIndex => prevIndex + 1);
          setLinesToRender(prevLines => [...prevLines, allLines[currentLineIndex + 1]]);
          setIsTyping(true);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [typedText, textToType, currentLineIndex, allLines]);

  return (
    <div className="terminal-log h-full">
      {linesToRender.map((line, index) => (
        <div key={index} className="terminal-log-line">
          {index < currentLineIndex ? line : typedText}
          {index === currentLineIndex && isTyping && <TypingIndicator />}
        </div>
      ))}
    </div>
  );
};
