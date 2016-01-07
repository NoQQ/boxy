'use strict';

var os = require('os'),
    moment = require('moment');

HTMLImports.whenReady(function () {
    Polymer({
        is: 'box-sysinfo',

        hostname: String,
        uptime: Number,
        freemem: Number,

        properties: {
            posAbsolute: {
                type: Boolean,
                value: false
            },
            top: String,
            right: String,
            bottom: String,
            left: String,
            width: String,
            height: String
        },
        _reposition: function () {
            if (this.posAbsolute) {
                this.$.box.style.position = 'absolute';

                if (this.top)
                    this.$.box.style.top = this.top;
                if (this.right)
                    this.$.box.style.right = this.right;
                if (this.bottom)
                    this.$.box.style.bottom = this.left;
                if (this.left)
                    this.$.box.style.left = this.left;
                if (this.width)
                    this.$.box.style.width = this.width;
                if (this.height)
                    this.$.box.style.height = this.height;
            }

        },
        _getSysInfos: function () {
            var that = this;

            this.hostname = os.hostname();
            this.uptime = moment((moment.now() - (os.uptime() * 1000))).fromNow();
            this.freemem = 
            
            setInterval(function () {
                that.uptime = moment((moment.now() - (os.uptime() * 1000))).fromNow();
            }, 25000);

        },
        ready: function () {
            this._reposition();
            this._getSysInfos();
        }
    });
});