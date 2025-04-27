import React, { useState, useEffect } from 'react';

export const DisplayCurrentCursorPosition = () => {
  const [cursorPosition, setCursorPosition] = useState({
    cursorPositionX: '',
    cursorPositionY: '',
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({
        cursorPositionX: event.clientX,
        cursorPositionY: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <h2>Current cursor position:</h2>
      <p>
        <b>Cursor position on X-axis:</b> {cursorPosition.cursorPositionX}
      </p>
      <p>
        <b>Cursor position on Y-axis:</b> {cursorPosition.cursorPositionY}
      </p>
    </div>
  );
};
