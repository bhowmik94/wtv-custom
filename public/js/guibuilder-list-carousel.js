(function () {
    window.myGui || (window.myGui = {})
    window.myGui.ListCarouselGuiBuilder = ListCarouselGuiBuilder;

    function ListCarouselGuiBuilder(carousel){
        if(!carousel) throw Error("no carousel provided");
        this.carousel = carousel;
    }

    ListCarouselGuiBuilder.prototype.buildContent = function(){
        // console.log("item carousel init ... ", this.carousel);
        var carousel = this.carousel;

        var $content = $('<section class="play-list"> \
                             <div class="head">'
                                +(carousel.options.icon ? '<span class="icon"><i class="'+carousel.options.icon+'"></i></span>' : '')
                                +'<span class="head-group">'
                                + (carousel.options.title ? '<span class="title">'+carousel.options.title+'</span>' : '')
                                + (carousel.options.subtitle ? '<span class="time">'+(carousel.options.subtitle ? carousel.options.subtitle : '')+'</span>' : '')
                                + '</span> \
                             </div> \
                             <div class="channel-carousel"></div> \
                           </section>');
        carousel.$dom.append($content);

        carousel.carousel = carousel.$dom.find('.channel-carousel')
        var md = new MobileDetect(window.navigator.userAgent);
        carousel.carousel.slick({
            infinite: false,
            dots: true,
            slidesToShow: carousel.slidePageSize || 3,
            slidesToScroll: carousel.slidePageSize || 3,
            // nextArrow: "<button class="slick-next slick-arrow"><svg viewBox="0 0 16 16" id="icon-arrow-right"><path fill="white" d="M5.5 0L4 1.5 10.5 8 4 14.5 5.5 16l8-8-8-8z"></path></svg></button>",
            // prevArrow: "<button class="slick-prev slick-arrow"><svg viewBox="0 0 16 16" id="icon-arrow-left"><path fill="white" d="M10.5 16l1.5-1.5L5.5 8 12 1.5 10.5 0l-8 8 8 8z"></path></svg></button>",
            nextArrow: ' \
                <button class="slick-next slick-arrow"> \
                    <i id="icon-arrow-right" /> \
                </button> \
            ',
            prevArrow: ' \
                <button class="slick-prev slick-arrow"> \
                    <i id="icon-arrow-left" /> \
                </button> \
            ',
            mobileFirst: md.phone() ? true: false,
            responsive: [
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    ListCarouselGuiBuilder.prototype.renderItemTitle = function(title){
        if(title && title.length && title.length > 39){
            var str = title.substr(0, 36);
            str += '...';
            return str;
        }else{
            return title;
        }
    }

    ListCarouselGuiBuilder.prototype.buildItem = function (item) {
        var self = this;
        var carousel = self.carousel;
        var $item = $('<div class="item"> \
                            <a href="'+(carousel.options.itemLinkTemplate ? carousel.options.itemLinkTemplate.replace(/{{itemId}}/g, item.id) : 'javascript:void(0)')+'"> \
                            <div class="content-wrap"> \
                                <div class="thumbnail"> \
                                    <div class="image"> \
                                        <img src="'+item.thumbnailUrl+'"> \
                                    </div> \
                                    <div class="icon"><i class="'+(item.playIcon ? item.playIcon : 'sharp-playlist')+'"></i></div> \
                                </div> \
                                <div class="info"> \
                                    <div class="meta"> \
                                        \
                                    </div> \
                                    <div class="title">'+self.renderItemTitle(item.title)+'</div> \
                                </div> \
                            </div> \
                            </a> \
                            <div class="slide-unactive-mask"></div> \
                       </div>');

        if(item.metas && item.metas.length){
            _.forEach(item.metas, function (meta) {
                $item.find('.info .meta').append($('<span class="meta-item"><i class="'+meta.icon+'"></i>'+meta.text+'</span>'))
            })
        }
        // self.carousel.slick('slickAdd', $item);
        return $item;
    }

    ListCarouselGuiBuilder.prototype.updateHeadTitle = function (header) {
        var carousel = this.carousel;
        var $head = carousel.$dom.find('.play-list .head');
        var $title = $head.find('.title');
        if($title && $title.length){
            $title.text(header)
        }else{
            $title = $('<span class="title">'+header+'</span>')
            $head.append($title);
        }
    }

    ListCarouselGuiBuilder.prototype.updateHeadMetas = function (metas) {
        var carousel = this.carousel;
        var carousel = this.carousel;
        var $head = carousel.$dom.find('.play-list .head');
        var $metas = $head.find('.meta');
        if(!$metas || !$metas.length){
            $metas = $('<div class="meta"></div>');
            $head.prepend($metas);
        }
        $metas.html('');
        _.forEach(metas, function (meta) {
            var $meta = $('<span class="meta-item"><i class="'+meta.icon+'"></i>'+meta.text+'</span>');
            $metas.append($meta);
        });
    }

}());

