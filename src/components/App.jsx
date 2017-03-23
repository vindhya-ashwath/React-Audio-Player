import React, { PropTypes } from 'react';

const App = ({ children }) => {
  return (
    <section>
      {children}
    </section>
  );
};

App.propTypes = {
  children: PropTypes.any,
};

export default App;
