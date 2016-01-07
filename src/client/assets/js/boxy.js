'use strict';

var Boxy = function (boxesContainer, debug) {
    this.debug = debug;
    var that = this;

    this.log = function (data, obj) {
        if (!this.debug)
            return;

        var prefix = '[Boxy][' + new Date().toString() + '] :: ';

        if (typeof data === 'string' || data instanceof String) {
            console.log(prefix + data);
        } else {
            console.log(prefix);
            console.log(data);
        }

        if (obj) console.log(obj);
    };

    this.ipc = require('electron').ipcRenderer;

    this.importBox = function (path) {
        return new Promise(function (resolve, reject) {
            Polymer.Base.importHref(path, () => {
                that.log('imported Box: ' + path);
                resolve(path);
            }, (err) => {
                that.log('error importing Box: ' + path);
                reject(err);
            });
        });
    };

    this.addBoxDom = function (dom) {
        var _dom = $(boxesContainer).append(dom);
        this.log('added Box\'s DOM:', _dom);
        return _dom;
    };
};

Boxy = new Boxy('#boxy-container', true);

$(document).ready(function () {
    Boxy.ipc.send('domReady');

    Boxy.ipc.on('addBoxDom', function (event, dom) {
        Boxy.addBoxDom(dom);
    });

    $('a.external-link').click(function (ev) {
        ev.preventDefault();
    });
});