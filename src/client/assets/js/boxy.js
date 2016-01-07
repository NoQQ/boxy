'use strict';

var ipc = require('electron').ipcRenderer;

function importBox(path) {
    Polymer.Base.importHref(path, function () {
        console.log(path + ' load!');
    }, function () {
        console.log(err);
    });
}
$(document).ready(function () {
    ipc.send('domReady');
    
    ipc.on('addBoxDom', function (event, dom) {
        console.log('should add: ' + dom);
        $('#boxy-container').append(dom);
    });
    
    $('a.external-link').click(function(ev) {
        ev.preventDefault();
    });
});