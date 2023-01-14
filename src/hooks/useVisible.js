import { useState } from "react";

const useVisible = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);

  const toggle = () => setIsVisible(!isVisible);
  const hide = () => setIsVisible(false);
  const show = () => setIsVisible(true);

  return { isVisible, toggle, show, hide };
};

export { useVisible };
