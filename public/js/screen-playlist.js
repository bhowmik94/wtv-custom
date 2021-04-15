
$(document).ready(function () {
    if(window.constants && window.constants.CURRENT_SCREEN == 'playlist'){
        setTimeout(function(){
            $(".video-player-container .loader-container").css("display", "none");
            $(".video-player-container .video-player").css("display", "block");
        }, 5000);

        // console.log("init playlist screen")
        var $currentPlaylist = new window.myGui.RestfulItemCarousel({
            selector: '#current-playlist-carousel',
            // icon: 'fas fa-play',
            // title: 'Most watched',
            apiUrl: window.constants.BASE_URL+"/api/channel/"+window.constants.CURRENT_CHANNEL_ID+"/playlist/"+window.constants.CURRENT_PLAYLIST_ID+"/videos",
            deserializer: window.myUtil.VideoListDeserializer,
            guiBuilder: window.myGui.ListCarouselGuiBuilder,
            itemLinkTemplate: window.constants.BASE_URL+"/playlist/"+window.constants.CURRENT_CHANNEL_ID+"/"+window.constants.CURRENT_PLAYLIST_ID+"/{{itemId}}/" + window.constants.LANGUAGE,
            pageSize: 18,
            slidePageSize: 3
        });
        $currentPlaylist.fetch(0, function () {
            if(window.constants.CURRENT_PLAYLIST_ID == 'featured'){
                // console.log("call inside feature")
                $currentPlaylist.updateHeadTitle('Featured playlist');

                var totalVideos = $currentPlaylist.paging.item_count;
                let totalVideosText = (totalVideos == null ? '' : totalVideos) + ' video' + (totalVideos > 1 ? 's': '')
                $currentPlaylist.updateHeadMetas([{
                    id: 'total-videos',
                    icon: 'sharp-playlist',
                    text: totalVideosText
                }])
            }else{
                $.get( window.constants.BASE_URL+"/api/channel/"+window.constants.CURRENT_CHANNEL_ID+"/playlist/"+window.constants.CURRENT_PLAYLIST_ID, function( data ) {
                    // console.log("call api url", data);
                    if(data && data.data && data.data.playlist){
                        var pl = data.data.playlist;
                        var duration = Math.round(parseFloat(pl.total_duration)/60);
                        var totalVideos = $currentPlaylist.paging.item_count;
                        let totalVideosText = (totalVideos == null ? '' : totalVideos) + ' video' + (totalVideos > 1 ? 's': '')
                        let durationText = duration + ' min' + (duration > 1 ? 's' : '');
                        $currentPlaylist.updateHeadTitle(pl.title);
                        $currentPlaylist.updateHeadMetas([
                            {
                                id: 'total-videos',
                                icon: 'sharp-playlist',
                                text: totalVideosText
                            },
                            {
                                id: 'duration',
                                icon: 'clock-icon',
                                text: durationText
                            }
                        ]);
                    }
                });
            }
        });
    }
});
