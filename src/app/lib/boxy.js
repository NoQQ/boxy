'use strict';

var electron = require('electron'),
    window = require('electron-window'),
    BrowserWindow = electron.BrowserWindow;

var path = require('path'),
    url = require('url');

var glob = require('glob');

var Boxy = function (windowConfig) {
    var that = this;

    var defaultWindowConfig = {
        type: 'desktop',
        x: 0,
        y: 0,
        fullscreen: true,
        transparent: true,
        skipTaskbar: true,
        frame: false,
        transparent: true
    };

    this.app = electron.app;
    this.ipc = electron.ipcMain;

    this.window = null;

    this.boxesPath = __dirname+'/../../boxes';
    this.boxes = {};

    this.injectImports = function () {
        glob(that.boxesPath+'/**/*.tmpl.html', {}, function(err, files) {
            files.forEach(function(path) {
                that.window.webContents.executeJavaScript('Boxy.importBox("' + path +'")');
            });
        });
    };
    
    this.injectDOMs = function() {
        require(that.boxesPath + '/boxes').boxes.forEach(function(box) {
            var dom = '<box-' + box.box + ' ';
            
            for(var arg in box.args) {
                if(box.args[arg] === '')
                    dom += arg + ' ';
                else
                    dom += arg+'=\''+box.args[arg] + '\' ';
                    
            }
            
            dom = dom.trim();
            
            dom += '></box-' + box.box + '>';
            
            that.window.webContents.send('addBoxDom', dom);
            
        });;
    };
    

    this.app.on('window-all-closed', () => {
        that.app.quit();
    });

    this.app.on('ready', function () {
        that.window = new BrowserWindow(defaultWindowConfig);
        that.window.loadURL('file://' + __dirname + '/../../client/boxy.html');

        that.window.webContents.on('did-finish-load', function () {
            that.window.webContents.openDevTools();

            console.log('Boxy\'s window is open');
            
            that.injectImports();
            that.injectDOMs();
        });
    });
};

module.exports = Boxy;