import styles from './templateVariable.module.css';
import classNames from 'clsx';
import { useSelected } from 'slate-react';
export interface TemplateVariablesPlugin {
  replace?: boolean;
}

const TemplateVariable = ({ attributes, children, element, editor }) => {
  const selected = useSelected();

  const classes = classNames(styles.container, {
    [styles.focused]: selected,
  });

  return (
    <span {...attributes}>
      <span contentEditable={false} className={classes}>
        {element.group} {element.name}
      </span>
      {children}
    </span>
  );
};

export default TemplateVariable;
