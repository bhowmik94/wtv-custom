(function () {
    window.myUtil || (window.myUtil = {})
    window.myUtil.VideoListDeserializer = VideoListDeserializer;
    function VideoListDeserializer(){
    }

    VideoListDeserializer.prototype.deserialize = function(data){
        if(!data) return null;

        var result = {};

        result.paging = {
            page_count: data.paging.page_count,
            item_count: data.paging.item_count
        };
        result.items = [];

        if(data.videos && data.videos.length){
            for(var i = 0; i < data.videos.length; i++){
                var item = data.videos[i];
                var duration = Math.round(parseFloat(item.length)/60);
                let durationText = duration + ' min' + (duration > 1 ? 's' : '');
                result.items.push({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    metas: [
                        {
                            icon: 'calendar-icon',
                            text: moment.unix(item.added_at).format("DD MMM YYYY")
                        },
                        {
                            icon: 'clock-icon',
                            text: durationText
                        }
                    ],
                    thumbnailUrl: item.thumbnail.image_640x360 || item.thumbnail.default,
                    playIcon: 'sharp-playbutton',
                    thumbnailUrlW1920H1080: item.thumbnail.image_1920x1080 || ''
                })
            }
        }

        return result;
    }
}());
