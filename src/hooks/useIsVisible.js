import { useState } from "react";

const useIsVisible = initialState => {
  const [isVisible, setIsVisible] = useState(initialState);

  const toggleIsVisible = () => setIsVisible(!isVisible);
  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  return { isVisible, toggleIsVisible, show, hide };
};

export { useIsVisible };
