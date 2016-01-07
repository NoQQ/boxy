'use strict';

var os = require('os'),
    moment = require('moment');

HTMLImports.whenReady(function () {
    function humanFileSize(B, i) {
        var e = i ? 1e3 : 1024;
        if (Math.abs(B) < e) return B + " B";
        var a = i ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "Ei‌​B", "ZiB", "YiB"],
            t = -1;
        do B /= e, ++t; while (Math.abs(B) >= e && t < a.length - 1);
        return B.toFixed(1) + " " + a[t]
    }

    Polymer({
        is: 'box-sysinfo',

        hostname: String,
        uptime: Number,
        freemem: String,
        totalmem: String,
        mempercent: String,
        loadavg: String,
        platform: String,
        
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
            this.platform = os.platform()+' '+os.arch()+' ('+os.release()+')';
            console.log(this.platform);
            this.uptime = moment((moment.now() - (os.uptime() * 1000))).fromNow();

            this.freemem = humanFileSize(os.freemem(), true);
            this.totalmem = humanFileSize(os.totalmem(), true);
            this.mempercent = ((os.freemem() / os.totalmem()) * 100).toFixed(2);
            
            var load = os.loadavg();
            this.loadavg = '1m[' + load[0].toFixed(2) + ']' + ' 5m[' + load[1].toFixed(2) + ']' + ' 15m[' + load[2].toFixed(2) + ']';

            // frequent updates
            setInterval(function () {
                var load = os.loadavg();
                that.loadavg = '1m[' + load[0].toFixed(2) + ']' + ' 5m[' + load[1].toFixed(2) + ']' + ' 15m[' + load[2].toFixed(2) + ']';

                that.freemem = humanFileSize(os.freemem(), true);
                that.totalmem = humanFileSize(os.totalmem(), true);
                that.mempercent = ((os.freemem() / os.totalmem()) * 100).toFixed(2);
            }, 1000 * 60);

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