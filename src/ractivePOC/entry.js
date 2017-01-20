import Ractive from 'ractive';

import Main from './components/main/main.js';
//import Store from './store/store.js';

Ractive.defaults.twoWay = false;

if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body)
    run();
else
    window.addEventListener('DOMContentLoaded', run, false);

function run() {
    let ractive = new Ractive({
        twoWay: false,
        el: '#main',
        template: '<Main />',
        components: {Main}
    });
}

