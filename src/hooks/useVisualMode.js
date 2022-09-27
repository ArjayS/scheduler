import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    // if true, this will replace the current mode in history with a new one.
    if (replace) {
      return setHistory((prev) => [...prev.slice(0, -1), mode]);
    }

    return setHistory((prev) => [...prev, mode]);
  };

  const back = () => {
    // This prevents the history array to have less than one value in its array
    if (history.length > 1) {
      return setHistory((prev) => [...prev.slice(0, -1)]);
    }
  };

  return { mode: history[history.length - 1], transition, back };
}
