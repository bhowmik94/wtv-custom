/* eslint-env jquery, browser */
$(document)
  .ready(function () {
    if (window.constants && window.constants.CURRENT_SCREEN == 'channel') {

      // var $heroCarousel = $('.hero-carousel')
      // $heroCarousel.slick({
      //     infinite: false,
      //     dots: true,
      // });
      var FETCH_PAGE_SIZE = 18;
      var SLIDE_PAGE_SIZE = 3;

      var $heroCarousel = new window.myGui.RestfulItemCarousel({
        selector: '#hero-carousel',
        apiUrl: window.constants.BASE_URL + '/api/channel/' + window.constants.CURRENT_CHANNEL_ID + '/videos/featured',
        deserializer: window.myUtil.VideoListDeserializer,
        guiBuilder: window.myGui.HeroCarouselGuiBuilder,
        itemLinkTemplate: window.constants.BASE_URL + '/playlist/' + window.constants.CURRENT_CHANNEL_ID + '/featured/{{itemId}}/' + window.constants.LANGUAGE,
        pageSize: FETCH_PAGE_SIZE,
        slidePageSize: 1
      });

      $heroCarousel.fetch(0, function () {

        reArrangeSomeElements();

        $(window)
          .on('resize', function () {
            reArrangeSomeElements();
          });


        // set background image 1st time
        let heroActiveSlides = $('.hero-carousel .item.slick-current.slick-active .carousel-item-info');
        if (heroActiveSlides && heroActiveSlides.length == 1) {
          let backgroundHiddenInput = $(heroActiveSlides[0])
            .find('[name=background-image-url]');
          if (backgroundHiddenInput && backgroundHiddenInput.length == 1) {
            $('.body-background img')
              .attr('src', backgroundHiddenInput[0].value);
          }
        }
      });


      var $featurePlaylist = new window.myGui.RestfulItemCarousel({
        selector: '#featured-playlist',
        icon: 'sharp-playlist-white',
        title: 'Featured playlists',
        subtitle: moment()
          .format('MMMM YYYY'),
        apiUrl: window.constants.BASE_URL + '/api/channel/' + window.constants.CURRENT_CHANNEL_ID + '/playlist/featured',
        deserializer: window.myUtil.PlayListDeserializer,
        guiBuilder: window.myGui.ListCarouselGuiBuilder,
        itemLinkTemplate: window.constants.BASE_URL + '/playlist/' + window.constants.CURRENT_CHANNEL_ID + '/{{itemId}}' + window.constants.LANGUAGE,
        pageSize: 6,
        slidePageSize: SLIDE_PAGE_SIZE
      });
      $featurePlaylist.fetch();

      if (window.constants.CURRENT_PLAYLIST_MOST_WATCHED) {
        var $mostWatchedVideos = new window.myGui.RestfulItemCarousel({
          selector: '#most-watched-videos',
          icon: 'sharp-playbutton-white',
          title: 'Most watched',
          apiUrl: window.constants.BASE_URL + '/api/channel/' + window.constants.CURRENT_CHANNEL_ID + '/videolist/most-watched',
          apiUrl: window.constants.BASE_URL + '/api/channel/' + window.constants.CURRENT_CHANNEL_ID + '/playlist/' + window.constants.CURRENT_PLAYLIST_MOST_WATCHED + '/videos',
          deserializer: window.myUtil.VideoListDeserializer,
          guiBuilder: window.myGui.ListCarouselGuiBuilder,
          itemLinkTemplate: window.constants.BASE_URL + '/playlist/' + window.constants.CURRENT_CHANNEL_ID + '/' + window.constants.CURRENT_PLAYLIST_MOST_WATCHED + '/{{itemId}}/'+window.constants.LANGUAGE,
          pageSize: FETCH_PAGE_SIZE,
          slidePageSize: SLIDE_PAGE_SIZE
        });
        $mostWatchedVideos.fetch();
      }

      if (window.constants.CURRENT_PLAYLIST_RECENT_EVENTS) {
        var $recentEventsVideos = new window.myGui.RestfulItemCarousel({
          selector: '#recent-events-videos',
          icon: 'sharp-playbutton-white',
          title: 'Recent Events',
          apiUrl: window.constants.BASE_URL + '/api/channel/' + window.constants.CURRENT_CHANNEL_ID + '/videolist/recent-events',
          apiUrl: window.constants.BASE_URL + '/api/channel/' + window.constants.CURRENT_CHANNEL_ID + '/playlist/' + window.constants.CURRENT_PLAYLIST_RECENT_EVENTS + '/videos',
          deserializer: window.myUtil.VideoListDeserializer,
          guiBuilder: window.myGui.ListCarouselGuiBuilder,
          itemLinkTemplate: window.constants.BASE_URL + '/playlist/' + window.constants.CURRENT_CHANNEL_ID + '/' + window.constants.CURRENT_PLAYLIST_RECENT_EVENTS + '/{{itemId}}/'+window.constants.LANGUAGE,
          pageSize: FETCH_PAGE_SIZE,
          slidePageSize: SLIDE_PAGE_SIZE
        });
        $recentEventsVideos.fetch();
      }
      if (window.constants.CURRENT_PLAYLIST_UPCOMING_EVENTS) {
        var $upcomingEventsVideos = new window.myGui.RestfulItemCarousel({
          selector: '#upcoming-events-videos',
          icon: 'sharp-playbutton-white',
          title: 'Upcoming Events',
          deserializer: window.myUtil.VideoListDeserializer,
          guiBuilder: window.myGui.ListCarouselGuiBuilder,
          itemLinkTemplate: window.constants.BASE_URL + '/playlist/' + window.constants.CURRENT_CHANNEL_ID + '/' + window.constants.CURRENT_PLAYLIST_RECENT_EVENTS + '/{{itemId}}/' + window.constants.LANGUAGE,
          pageSize: FETCH_PAGE_SIZE,
          slidePageSize: SLIDE_PAGE_SIZE
        });
        $upcomingEventsVideos.fetch();
      }
    }

    $('body')
      .on('click', '.slide-unactive-mask', function () {
        let clickedSlide = $(this)
          .parent();
        let currentSlick = false;
        if (clickedSlide.parent().length == 1
          && $(clickedSlide.parent()[0])
            .hasClass('channel-carousel')) {
          currentSlick = clickedSlide.parent();
        } else if (clickedSlide.parent()
            .parent().length == 1
          && $(clickedSlide.parent()
            .parent()[0])
            .hasClass('channel-carousel')) {
          currentSlick = clickedSlide.parent()
            .parent();
        } else if (clickedSlide.parent()
            .parent()
            .parent().length == 1
          && $(clickedSlide.parent()
            .parent()
            .parent()[0])
            .hasClass('channel-carousel')) {
          currentSlick = clickedSlide.parent()
            .parent()
            .parent();
        } else if (clickedSlide.parent()
            .parent()
            .parent()
            .parent().length == 1
          && $(clickedSlide.parent()
            .parent()
            .parent()
            .parent()[0])
            .hasClass('channel-carousel')) {
          currentSlick = clickedSlide.parent()
            .parent()
            .parent()
            .parent();
        }

        if (!currentSlick) {
          return;
        }

        let prevSlide = clickedSlide.prev();
        let nextSlide = clickedSlide.next();
        if (prevSlide.length == 1 && $(prevSlide[0])
          .hasClass('slick-active')) {
          // left is active => move to right
          $(currentSlick)
            .slick('slickNext');
        } else if (nextSlide.length == 1 && $(nextSlide[0])
          .hasClass('slick-active')) {
          // right is active => move to left
          $(currentSlick)
            .slick('slickPrev');
        }
      });
  });

function reArrangeSomeElements() {
  if (window.outerWidth >= 1201) {
    var heroCarouselElement = $('#hero-carousel .hero-carousel');
    var channelElement = $('.main-content section.channels');
    var bodyBackgroundHeight = $('.body-background')
      .outerHeight();
    if (bodyBackgroundHeight < 800) {
      bodyBackgroundHeight = 800;
    }
    var channelElementDynamicMarginTop = bodyBackgroundHeight - heroCarouselElement.height() - parseInt(heroCarouselElement.css('margin-top')) + 48;
    if (channelElementDynamicMarginTop > 48) {
      $(channelElement)
        .css('margin-top', channelElementDynamicMarginTop);
    }

    var countSet = 0;
    var setChannelsMarginInterval = setInterval(function () {
      countSet++;
      if (countSet >= 50) {
        clearInterval(setChannelsMarginInterval);
      }
      if ($('.body-background')
        .outerHeight() > bodyBackgroundHeight) {
        // set postion of hero carousel again
        $(heroCarouselElement)
          .css('margin-top', $('.body-background')
            .outerHeight() / 2);
        // set channel margin top after background's height is ready (image was loaded)
        $(channelElement)
          .css('margin-top', $('.body-background')
            .outerHeight() - heroCarouselElement.height() - parseInt(heroCarouselElement.css('margin-top')) + 48);
      }

      // only for IE
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf('MSIE ');

      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        console.log($('.body-background')
          .outerHeight());
        console.log(bodyBackgroundHeight);
        if ($('.body-background')
          .outerHeight() < bodyBackgroundHeight) {
          // set postion of hero carousel again
          $(heroCarouselElement)
            .css('margin-top', $('.body-background')
              .outerHeight() / 2);
          // set channel margin top after background's height is ready (image was loaded)
          $(channelElement)
            .css('margin-top', $('.body-background')
              .outerHeight() - heroCarouselElement.height() - parseInt(heroCarouselElement.css('margin-top')) + 48);
        }
      }
    }, 100);
  }
}
