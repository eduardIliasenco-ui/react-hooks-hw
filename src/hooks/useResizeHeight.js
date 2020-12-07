import React, { useRef, useState, useEffect } from "react";

export const useResizeHeight = (listRef) => {
  const [currentHeight, setCurrentHeight] = useState(0);
  useEffect(() => {
    const height = listRef.current && listRef.current.offsetHeight;

    if (height && currentHeight !== height) {
      setCurrentHeight(height);
    }
  }, []);
  return currentHeight;
};
