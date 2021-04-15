(function () {
    window.myGui || (window.myGui = {})
    window.myGui.ItemCarousel = ItemCarousel;

    function ItemCarousel(options){
        if(!options.selector) throw Error("no selector provided");
        if(!options.guiBuilder) throw Error("no gui builder provided");
        this.options = options;
        this.$dom = $(options.selector);
        this.guiBuilder = new this.options.guiBuilder(this);
        this.items = [];
        this.header = {
            title: '',
            metas: []
        };

    }

    ItemCarousel.prototype.render = function(){
        if(this.rendered) return;
        // console.log("item carousel init1 ... ", this.options.guiBuilder);
        // console.log("item carousel init2 ... ", this.guiBuilder);
        this.guiBuilder.buildContent();
        (typeof this.onRenderCompleted == 'function') && this.onRenderCompleted();
        this.rendered = true;
    }

    ItemCarousel.prototype.addItems = function(items){
        var self = this;
        if(!this.rendered) self.render();
        // this.carousel.slick('slickAdd', html);
        if(items && items.length){
            _.forEach(items, function (item) {
                // console.log(item);
                var existing = _.find(self.items, function(i) { return String(i.id) == String(item.id); });
                if(!existing){
                    self.addItemToCarousel(item);
                    self.items.push(item);
                }
            })
        }
    }
    
    ItemCarousel.prototype.addItemToCarousel = function (item) {
        var self = this;
        var $item = self.guiBuilder.buildItem(item);
        self.carousel.slick('slickAdd', $item);
    }

    ItemCarousel.prototype.updateHeadTitle = function (header) {
        var self = this;
        this.header.title = header;
        self.guiBuilder.updateHeadTitle(header);
    }

    ItemCarousel.prototype.updateHeadMetas = function (metas) {
        var self = this;
        _.forEach(metas, function (meta) {
            var found = _.find(self.header.metas, function (existing) {
                return meta.id && existing.id == meta.id;
            })
            if(found){
                found.icon = meta.icon;
                found.text = meta.text;
            }else{
                self.header.metas.push(meta)
            }
        })
        // console.log("updateHeadMetas", self.header.metas)
        self.guiBuilder.updateHeadMetas(self.header.metas)
    }

}());

