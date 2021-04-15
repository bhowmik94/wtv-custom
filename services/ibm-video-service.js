
const ibmApiRequest = require('./ibm-api-request')

const IBM_API_URL = process.env.IBM_API_BASE_URL

function ibmGetDataRequest(url, errorMessage){
    return new Promise(async(resolve, reject) => {
        try{
            let response = await ibmApiRequest().get(url)
            if(response && response.data){
                return resolve(response.data)
            }else{
                return reject()
            }
        }catch (e) {
            console.log(errorMessage, e);
            return reject();
        }
    });
}

exports.getVideoDetails = function(videoId){
    return ibmGetDataRequest(`${IBM_API_URL}/videos/${videoId}.json`, `Error when requesting video details - videoId: ${videoId} - `)
}

exports.getPlaylistDetails = function(playlistId){
    return ibmGetDataRequest(`${IBM_API_URL}/playlists/${playlistId}.json`, `Error when requesting playlist details - playlistId: ${playlistId} - `)
}

exports.getChannelFeaturedVideos = function(channelId, paging = {pagesize: 18, page: 1}){
    return ibmGetDataRequest(`${IBM_API_URL}/channels/${channelId}/featured-videos.json?pagesize=${paging.pagesize}&page=${paging.page}`,
        `Error when requesting channel featured videos - channelId: ${channelId}, pagesize: ${paging.pagesize}, page: ${paging.page} - `)
}

exports.getVideosInPlaylist = function (playlistId, paging = {pagesize: 18, page: 1}){
    return ibmGetDataRequest(`${IBM_API_URL}/playlists/${playlistId}/videos.json?pagesize=${paging.pagesize}&page=${paging.page}`,
        `Error when requesting videos of playlist - playlistId: ${playlistId}, pagesize: ${paging.pagesize}, page: ${paging.page} - `)
}

exports.getChannelPlaylist = function (channelId, paging= {pagesize: 18, page: 1}){
    return ibmGetDataRequest(`${IBM_API_URL}/channels/${channelId}/playlists.json?pagesize=${paging.pagesize}&page=${paging.page}`,
        `Error when requesting channel play list - channelId: ${channelId}, pagesize: ${paging.pagesize}, page: ${paging.page} - `);
}

exports.getChannelDetails = function (channelId) {
    return ibmGetDataRequest(`${IBM_API_URL}/channels/${channelId}.json`, `Error when requesting ibm channel details - channelId: ${channelId} - `)

        /*resolve({
                "channel": {
                    "id": "23711860",
                    "title": "Branded Channel",
                    "picture": {
                        "90x90": "https://ustvstaticcdn1-a.akamaihd.net/i/channel/picture/2/3/7/1/23711860/23711860,90x90,r:2.jpg",
                        "66x66": "https://ustvstaticcdn1-a.akamaihd.net/i/channel/picture/2/3/7/1/23711860/23711860,66x66,r:2.jpg",
                        "48x48": "https://ustvstaticcdn1-a.akamaihd.net/i/channel/picture/2/3/7/1/23711860/23711860,48x48,r:2.jpg"
                    },
                    "description": "",
                    "tags": [],
                    "url": "YrDwCJW6Jjh",
                    "status": "offair",
                    "last_broadcast_at": 1572521558,
                    "tinyurl": "https://video.ibm.com/channel/YrDwCJW6Jjh",
                    "stats": {
                        "follower": 0,
                        "viewer_total": 102,
                        "video": 15
                    },
                    "thumbnail": {
                        "live": "https://ustvstaticcdn1-a.akamaihd.net/i/channel/picture/2/3/7/1/23711860/23711860,192x108,bf:2.jpg"
                    },
                    "autorecord": {
                        "type": "private",
                        "days": null
                    },
                    "stream": {
                        "hls": "http://iphone-streaming.ustream.tv/uhls/23711860/streams/live/iphone/playlist.m3u8"
                    },
                    "owner": {
                        "id": "43759836",
                        "username": "fuj734yhfv2",
                        "picture": "https://ustvstaticcdn1-a.akamaihd.net/i/user/picture/4/3/7/5/43759836/43759836_20190625_115656_1565011951,48x48,r:1.jpg"
                    },
                    "locks": {}
                }

        })*/
}

exports.getUpcomingEvents = function (channelId){
    console.log('this has been called')
    return ibmGetDataRequest(`${IBM_API_URL}/channels/${channelId}/upcoming-events.json`, `Error when requesting ibm channel details - channelId: ${channelId} - `)

}
exports.getUpcomingVideo = function (videoId){

    return ibmGetDataRequest(`${IBM_API_URL}/videos/${videoId}.json`, `Error when requesting ibm channel details - videoId: ${videoId} - `)

}
