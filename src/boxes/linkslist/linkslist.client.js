 HTMLImports.whenReady(function () {
     Polymer({
         is: 'box-linkslist',

         properties: {
             links: Array,
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
         ready: function () {
            this._reposition();
            //this.links = JSON.parse(this.links);
             
             console.log(this.links);
         }
     });
 });