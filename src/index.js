import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './serviceWorker';
import Show from './components/Show';

ReactDOM.render (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/show/:id" component={Show} />
    </div>
  </Router>,
  document.getElementById ('root')
);
registerServiceWorker ();
