import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/main_app/App.component';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
