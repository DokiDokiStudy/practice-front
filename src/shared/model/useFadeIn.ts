import { useEffect, useState } from "react";

export const useFadeIn = (delay: number = 125) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return fadeIn;
};
