import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import '../lib/PrototypeArray.js';
import '../lib/PrototypeMath.js';
import '../lib/PrototypeObject.js';
import '../lib/PrototypeString.js';
import '../lib/PrototypeDate.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
