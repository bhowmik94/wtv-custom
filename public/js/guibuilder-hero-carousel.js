(function () {
    window.myGui || (window.myGui = {})
    window.myGui.HeroCarouselGuiBuilder = HeroCarouselGuiBuilder;

    function HeroCarouselGuiBuilder(carousel){
        if(!carousel) throw Error("no carousel provided");
        this.carousel = carousel;
    }

    HeroCarouselGuiBuilder.prototype.buildContent = function(){
        var carousel = this.carousel;

        var $content = $('<div class="hero-carousel"></div>');
        carousel.$dom.append($content);

        carousel.carousel = $content;
        carousel.carousel.slick({
            infinite: false,
            dots: true
        });

        this.carousel.carousel.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            // for empty data
            if (!slick || !slick.$slides || slick.$slides.length == 0) {
                return;
            }

            let slides = slick.$slides;
            let nextSlideDOM = $(slides[nextSlide].innerHTML);
            let backgroundHiddenInput = nextSlideDOM.find("[name=background-image-url]");
            if (backgroundHiddenInput.length == 1) {
                let backgroundImageUrl = backgroundHiddenInput[0].value;
                // set new background
                $(".body-background img").attr("src", backgroundImageUrl);
            }
        });

    }


    HeroCarouselGuiBuilder.prototype.buildItem = function (item) {
        var self = this;
        var carousel = self.carousel;
        let thumbnailUrl = item.thumbnailUrlW1920H1080 ? item.thumbnailUrlW1920H1080 : item.thumbnailUrl;
        var $item = $('<div class="item"> \
                            <div class="carousel-item-info"> \
                                <img src="'+thumbnailUrl+'" style="display: none;" /> \
                                <input type="hidden" name="background-image-url" value="'+thumbnailUrl+'" /> \
                                <div class="meta"></div> \
                                <div class="title">'+item.title+'</div> \
                                <div class="desc">'+(item.description ? item.description : '')+'</div> \
                                <div class="controls"> \
                                    <a class="btn-play" tabindex="0" href="'+(carousel.options.itemLinkTemplate ? carousel.options.itemLinkTemplate.replace(/{{itemId}}/g, item.id) : 'javascript:void(0)')+'"><i class="sharp-playbutton-white"></i></a> \
                                    <span class="text">Play video</span> \
                                </div> \
                            </div> \
                       </div>');

        if(item.metas && item.metas.length){
            _.forEach(item.metas, function (meta) {
                $item.find('.meta').append($('<span class="meta-item"><i class="'+meta.icon+'"></i>'+meta.text+'</span>'))
            })
        }

        return $item;
    }

}());

