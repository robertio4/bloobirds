import React, { ChangeEvent, useRef } from 'react';

import styles from './ColorPicker.module.css';

export const ColorInput = ({
  value = '#000000',
  onChange,
  children,
}: React.PropsWithChildren<{
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}>) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleClick = e => {
    e.preventDefault();

    // force click action on the input to open color picker
    ref.current?.click();
  };

  return (
    <div className={styles.colorInputContainer}>
      {React.Children.map(children, child => {
        if (!child) return child;

        return React.cloneElement(child as React.ReactElement, {
          onClick: handleClick,
        });
      })}

      <input
        ref={ref}
        type="color"
        onChange={onChange}
        value={value}
        className={styles.colorInputInput}
      />
    </div>
  );
};
