 HTMLImports.whenReady(function () {
     Polymer({
         is: 'box-clock',

         hours: '00',
         minutes: '00',
         seconds: '00',

         day: '00',
         month: '00',
         year: '0000',

         properties: {
             hideTime: {
                 type: Boolean,
                 value: false
             },
             hideDate: {
                 type: Boolean,
                 value: false
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
         },
         _startCounting: function () {
             var that = this;

             console.log('3', this.posAbsolute, this.hideTime);
             setInterval(function () {
                 var date = new Date();
                 that.hours = ((date.getHours() < 10) ? '0' : '') + date.getHours();
                 that.minutes = ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes();
                 that.seconds = ((date.getSeconds() < 10) ? '0' : '') + date.getSeconds();

                 that.day = ((date.getDay() < 10) ? '0' : '') + date.getDay();
                 that.month = date.getMonth() + 1;
                 that.month = ((that.month < 10) ? '0' : '') + that.month;
                 that.year = date.getFullYear();
             }, 1000);
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
         ready: function () {
             this._startCounting();
             this._reposition();
         }
     });
 });