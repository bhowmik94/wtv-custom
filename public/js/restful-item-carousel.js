(function () {
    window.myGui || (window.myGui = {})
    window.myGui.RestfulItemCarousel = RestfulItemCarousel;
    var ItemCarousel = window.myGui.ItemCarousel;

    RestfulItemCarousel.prototype = Object.create(ItemCarousel.prototype);
    RestfulItemCarousel.prototype.constructor = ItemCarousel;

    function RestfulItemCarousel(options){
        ItemCarousel.call(this, options);

        if(!options.apiUrl) throw Error("no api url provided");
        this.currentPage = 1;
        this.pageSize = this.options.pageSize || 9;
        this.slidePageSize = this.options.slidePageSize || 3;
        this.paging = {};
    }

    RestfulItemCarousel.prototype.fetchNext = function(){
        var self = this;
        console.log("fetchNext:" + self.currentPage)
        var oldCurrentPage = self.currentPage;
        self.fetch(self.currentPage + 1, function (result) {
            console.log("fetching result ", result)
            if(!result.items || !result.items.length){
                console.log("reset current page: ", oldCurrentPage)
                self.currentPage = oldCurrentPage;
            }
        });
    }

    RestfulItemCarousel.prototype.fetch = function(page, callback){
        var self = this;
        if(page){
            self.currentPage = page;
        }

        $.get( this.options.apiUrl+"?pagesize="+self.pageSize+"&page="+self.currentPage, function( data ) {
            // console.log("call api url", data);
            var result = data;
            if(self.options.deserializer){
                var de = new self.options.deserializer()
                result = de.deserialize(data.data);
            }

            // console.log("call api url ", result)
            self.addItems(result.items);
            self.paging = result.paging;
            if(callback && typeof callback == 'function'){
                callback(result)
            }
        });
    }

    RestfulItemCarousel.prototype.onRenderCompleted = function () {
        var self = this;
        // console.log("on render completed");
        // this.carousel.on('edge', function(event, slick, direction){
        //     console.log('edge was hit - event: ', event);
        //     console.log('edge was hit - slick: ', slick)
        //     console.log('edge was hit - direction: ', direction)
        // });
        var md = new MobileDetect(window.navigator.userAgent);
        let slideToshow = md.mobile() ? 1 : self.slidePageSize;

        this.carousel.on('afterChange', function(event, slick, currentSlide){
            // console.log(currentSlide, slideToshow, self.paging.item_count, self.paging.page_count);
            if(currentSlide + slideToshow >= self.items.length){
                // console.log("trigger fetch next ...");
                self.fetchNext()
            }
        });
    }
}())

