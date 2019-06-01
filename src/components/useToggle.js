import { useState, useCallback } from "react";

export default open => {
  const [isOpen, setIsOpen] = useState(open);
  const show = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const hide = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);
  return { isOpen, hide, show, toggle };
};
