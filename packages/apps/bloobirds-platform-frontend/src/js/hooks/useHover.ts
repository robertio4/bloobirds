import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useHover = (targetRef: {
  outsideRef?: MutableRefObject<undefined>;
  current?: any;
}) => {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = targetRef?.current || ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseOver);
      node.addEventListener('mouseleave', handleMouseOut);

      return () => {
        node.removeEventListener('mouseenter', handleMouseOver);
        node.removeEventListener('mouseleave', handleMouseOut);
      };
    }
    return () => {};
  }, [ref.current]);

  return [ref, value];
};
