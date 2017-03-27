import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { HomePage, SamplePage, NotFoundPage, PlayerPage, AudioPlayerPage } from 'components';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={HomePage} />
    <Route path="/sample" component={SamplePage} />
    <Route path="/test" component={PlayerPage} />
    <Route path="/player" component={AudioPlayerPage} />
    <Route path="*" component={NotFoundPage} />
  </Router>
);

export default routes;
