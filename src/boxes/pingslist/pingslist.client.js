var request = require('request');

HTMLImports.whenReady(function () {
    var Probe = function (type, target, match) {
        var that = this;

        this.type = type;
        this.target = target;
        this.status = 0;
        this.ok = false;
        this.match = match;

        this.requestCurrentStatus = function (cb, notifier) {
            this.updaters[this.type](cb, notifier);
        };

        this.updaters = {
            http: function (cb, notifier) {
                request({
                    uri: that.target,
                    method: (that.match ? 'GET' : 'HEAD')
                }, function (err, res, body) {
                    if (err) return cb(err);
                    cb(null, res.statusCode);
                });
            }
        }
    };

    var Box = function () {
        var that = this;

        this.is = 'box-pingslist';

        this.properties = {
            probes: Array,
            _reports: Array,
            _probes: {
                type: Array,
                notify: true
            },
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
        };

        var _reposition = function (poly) {
            if (poly.posAbsolute) {
                poly.$.box.style.position = 'absolute';

                if (poly.top)
                    poly.$.box.style.top = poly.top;
                if (poly.right)
                    poly.$.box.style.right = poly.right;
                if (poly.bottom)
                    poly.$.box.style.bottom = poly.left;
                if (poly.left)
                    poly.$.box.style.left = poly.left;
                if (poly.width)
                    poly.$.box.style.width = poly.width;
                if (poly.height)
                    poly.$.box.style.height = poly.height;
            }
        };

        this._updateProbes = function () {
            console.log(this._probes);
            for (var i = 0; i < this._probes.length; i++) {
                (function (probes, poly, i) {
                    probes[i].requestCurrentStatus(function (err, status) {
                        poly._probes[i].status = status;
                        poly.set('_probes.' + i + '.status', status);
                    });
                })(this._probes, this, i);
            }
        }

        this.ready = function () {
            _reposition(this);

            var stack = [];
            this.probes.forEach(function (probe, index) {
                stack.push(new Probe(probe.type, probe.target, probe.match));
            });
            this._probes = stack;
            
            this._updateProbes(this);
            setInterval(this._updateProbes.bind(this), 1000 * 60 * 5);
        };
    };

    Polymer(new Box());
});