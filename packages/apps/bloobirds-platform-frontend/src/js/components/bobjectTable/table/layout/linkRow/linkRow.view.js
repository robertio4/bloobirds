import React from 'react';
import { Link } from 'react-router-dom';

const LinkRow = props => {
  const { children, linkProps, url } = props;
  return (
    <Link {...linkProps} to={url}>
      {children}
    </Link>
  );
};

export default LinkRow;
