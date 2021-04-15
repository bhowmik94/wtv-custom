(function () {
    window.myUtil || (window.myUtil = {})
    window.myUtil.PlayListDeserializer = PlayListDeserializer;
    function PlayListDeserializer(){
    }

    PlayListDeserializer.prototype.deserialize = function(data){
        if(!data) return null;

        var result = {};

        result.paging = {
            page_count: data.paging.page_count,
            item_count: data.paging.item_count
        };
        result.items = []

        if(data.playlists && data.playlists.length){
            for(var i = 0; i < data.playlists.length; i++){
                var playlist = data.playlists[i];
                var duration = Math.round(parseFloat(playlist.total_duration)/60);
                var totalVideos = playlist.video_count;
                let totalVideosText = (totalVideos == null ? '' : totalVideos) + ' video' + (totalVideos > 1 ? 's': '')
                let durationText = duration + ' min' + (duration > 1 ? 's' : '');
                result.items.push({
                    id: playlist.id,
                    title: playlist.title,
                    metas: [
                        {
                            icon: 'sharp-playlist',
                            text: totalVideosText
                        },
                        {
                            icon: 'clock-icon',
                            text: durationText
                        }
                    ],
                    thumbnailUrl: playlist.thumbnail.image_640x360 || playlist.thumbnail.default
                })
            }
        }

        return result;
    }
}());
