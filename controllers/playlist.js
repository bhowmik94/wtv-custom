
const ibmService = require('../services/cachable-ibm-video-service')
const numeral = require('numeral')
const moment = require('moment')
const VIDEO_EMBEDDED_BASE_URL = process.env.VIDEO_EMBEDDED_BASE_URL || `https://video.ibm.com/embed/recorded`;
const defaultText = require('../config/languagesText')
const defaultConfig = require('../config/defaultConfig')

async function getPlaylistModel({channelId, playlistId, videoId, channel,language}){
    let videoRes = await ibmService.getVideoDetails(videoId);
    if(!videoRes || !videoRes.video){
        return null;
    }
    let video = videoRes.video;
    let duration = Math.round(parseFloat(video.length)/60);
    return {
        title: 'Playlist',
        noBorderHeader: true,
        channelId: channelId,
        playlistId: playlistId,
        videoId: videoId,
        videoTitle: video.title,
        videoTime: moment.unix(video.added_at).format('DD MMM YYYY'),
        videoDescription: video.description,
        videoEmbeddedUrl: `${VIDEO_EMBEDDED_BASE_URL}/${videoId}`,
        videoDuration: `${duration} ${duration > 1 ? 'mins' : 'min'}`,
        channelTitle: channel.title,
        channelTotalView: channel.stats && channel.stats.viewer_total ? numeral(channel.stats.viewer_total).format('0,0') : 0,
        siteBaseUrl: `${process.env.BASE_URL}`,
        headerMenu:defaultText[language].menuHeader,
        language:language,
        footer:defaultConfig.socialMedia

    };
}
async function getSingleVideoPlaylistModel({channelId, videoId, channel,language}){
    let videoRes = await ibmService.getVideoDetails(videoId);
    if(!videoRes || !videoRes.video){
        return null;
    }
    let video = videoRes.video;
    let duration = Math.round(parseFloat(video.length)/60);
    return {
        title: 'Playlist',
        noBorderHeader: true,
        channelId: channelId,
        playlistId: 'featured',
        videoId: videoId,
        videoTitle: video.title,
        videoTime: moment.unix(video.added_at).format('DD MMM YYYY'),
        videoDescription: video.description,
        videoEmbeddedUrl: `${VIDEO_EMBEDDED_BASE_URL}/${videoId}`,
        channelTitle: channel.title,
        channelTotalView: channel.stats && channel.stats.viewer_total ? numeral(channel.stats.viewer_total).format('0,0') : 0,
        siteBaseUrl: `${process.env.BASE_URL}`,
        language:language,
        headerMenu:defaultText[language].menuHeader,
        footer:defaultConfig.socialMedia
    };
}
async function getLiveVideoPlaylistModel({channelId,playlistId, channel,language}){
    return {
        title: 'Playlist',
        noBorderHeader: true,
        channelId: channelId,
        playlistId: 'featured',
        videoTitle: "Live Video",
        videoDescription: "This is a live event video",
        channelTitle: channel.title,
        channelTotalView: channel.stats && channel.stats.viewer_total ? numeral(channel.stats.viewer_total).format('0,0') : 0,
        siteBaseUrl: `${process.env.BASE_URL}`,
        headerMenu:defaultText[language].menuHeader,
        language:language,
        footer:defaultConfig.socialMedia
    };
}



exports.indexPlaylist = async (req, res) => {
    let {channelId, playlistId} = req.params;
    console.log(`indexPlaylist - channel id: ${channelId}, playlistId: ${playlistId}`)
    if(!channelId || !playlistId) return res.status(404).send();

    try{
        let result = await ibmService.getChannelDetails(channelId)
        if(result && result.channel){
            let videoId = null;
            let videos = await ibmService.getVideosInPlaylist(playlistId);
            if(videos.videos && videos.videos.length){
                videoId = videos.videos[0].id;
            }

            let model = await getPlaylistModel({channelId, playlistId, videoId, channel: result.channel,language:req.params.language});
            if(model == null) return res.status(404).send();
            res.render('playlist', model);
        }else{
            return res.status(404).send()
        }
    }catch (e) {
        console.error(`error when requesting playlist details`)
        return res.status(404).send()
    }
}
/**
 * GET /playlist/:channelId/:playlistId/:videoId
 * Home page.
 */
exports.indexVideo = async (req, res) => {
    console.log(req.params.language)
    let {channelId, playlistId, videoId} = req.params;
    console.log(`indexVideo - channel id: ${channelId}, playlistId: ${playlistId}, videoId: ${videoId}`)
    if(!channelId || !playlistId || !videoId){return res.status(404).send()}

    try{
        let result = await ibmService.getChannelDetails(channelId)
        if(result && result.channel){
            let model = await getPlaylistModel({channelId, playlistId, videoId, channel: result.channel,language:req.params.language});
            if(model == null) return res.status(404).send();
            res.render('playlist', model);
        }else{
            return res.status(404).send()
        }
    }catch (e) {
        console.error(`error when requesting playlist details`)
        return res.status(404).send()
    }
};

exports.indexLiveVideo = async (req, res)=>{
    console.log(req.params.language)
    let {channelId, playlistId} = req.params;
    console.log(`indexVideo - channel id: ${channelId}, playlistId: ${playlistId}`)
    if(!channelId || !playlistId){return res.status(404).send()}

    try{
        let result = await ibmService.getChannelDetails(channelId)
        if(result && result.channel){
            let model = await getLiveVideoPlaylistModel({channelId, playlistId, channel: result.channel,language:req.params.language});
            if(model == null) return res.status(404).send();
            res.render('live', model);
        }else{
            return res.status(404).send()
        }
    }catch (e) {
        console.error(`error when requesting playlist details`)
        return res.status(404).send()
    }


}


exports.indexVideoUpcoming = async (req, res) => {

    let {channelId, videoId} = req.params;
    console.log(channelId)
    if(!channelId || !videoId){return res.status(404).send()}

    try{
        let result = await ibmService.getChannelDetails(channelId);
        if(result && result.channel){
            let model = await getSingleVideoPlaylistModel({channelId, videoId, channel: result.channel,language:req.params.language});
            if(model == null) return res.status(404).send();
            res.render('playlist', model);
        }else{
            return res.status(404).send()
        }
    }catch (e) {
        console.error(`error when requesting playlist details`);
        return res.status(404).send()
    }
};

