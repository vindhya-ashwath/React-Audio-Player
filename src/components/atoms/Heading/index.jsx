import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Heading = (props) => {
  const {
    as,
    className,
    children,
  } = props;

  const classNames = classnames(
    className
  );

  const Element = as;

  return (
    <Element className={classNames}>
      {children}
    </Element>
  );
};

Heading.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

Heading.defaultProps = {
  as: 'h1',
};

export default Heading;
