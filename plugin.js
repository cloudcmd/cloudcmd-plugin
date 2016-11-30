/* global CloudCmd */
/* global DOM */
/* global exec */
/* global RunKit */

((CloudCmd, load, exec) => {
    'use strict';
        
    const element = document.createElement('div');
    
    element.id = 'runkit'
    element.style.overflow = 'hidden';
    element.style.width='400px';
    
    exec.series([
        loadRunKit,
        notebook,
        CloudCmd.View,
        init,
    ]);
    
    function loadRunKit(fn) {
        load.js('https://embed.runkit.com', fn);
    }
    
    function notebook(fn) {
        fn();
        RunKit.createNotebook({
            element,
            source: getSource()
        });
    }
    
    function init() {
        CloudCmd.View.show(element, {
            autoSize: true
        });
    }
    
    function getSource() {
        return `
const redrun = require('redrun');

redrun('check', {
    lint: 'eslint lib test',
    check: 'redrun lint test',
    test: 'tape \\'test/*.js\\''
});
`
    }
    
})(CloudCmd, DOM.load, exec);

