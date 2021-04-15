const ibmVideoService = require('./ibm-video-service');
const CachedApiData = require('../models/CachedAPIData');
const CACHE_API_DATA_EXPIRY_IN_SECONDS = process.env.CACHE_API_DATA_EXPIRY_IN_SECONDS || 300;
const _ = require('lodash');

function accessCacheData(key, callableFetch, errMsg) {
  return new Promise(async (resolve, reject) => {
    try {
      let cached = await CachedApiData.findOne({ key });
      if (cached && cached.value && cached.cacheExpiry && (cached.cacheExpiry.getTime() - Date.now() > 0)) {
        console.log(`got result from cached - key: ${key}`);
        return resolve(cached.value);
      } else {
        try {
          console.log(`fetch result from api for caching - key: ${key}`);
          let data = await callableFetch();
          await CachedApiData.findOneAndUpdate({ key }, {
            value: data,
            cacheExpiry: Date.now() + CACHE_API_DATA_EXPIRY_IN_SECONDS * 1000
          }, { upsert: true });
          return resolve(data);
        } catch (apiErr) {
          return reject();
        }
      }
    } catch (e) {
      console.log(errMsg, e);
      return reject();
    }
  });
}

exports.getVideoDetails = function (videoId) {
  let key = `getVideoDetails_${videoId}`;
  let errorMsg = `Error when requesting cached data - getVideoDetails, videoId: ${videoId} `;
  let callableFetch = () => {
    return ibmVideoService.getVideoDetails(videoId);
  };
  return accessCacheData(key, callableFetch, errorMsg);
};

exports.getPlaylistDetails = function (playlistId) {
  let key = `getPlaylistDetails_${playlistId}`;
  let errorMsg = `Error when requesting cached data - getPlaylistDetails, playlistId: ${playlistId} `;
  let callableFetch = () => {
    return ibmVideoService.getPlaylistDetails(playlistId);
  };
  return accessCacheData(key, callableFetch, errorMsg);
};

exports.getChannelFeaturedVideos = function (channelId, paging = {
  pagesize: 18,
  page: 1
}) {
  let key = `getChannelFeaturedVideos_${channelId}_pagesize_${paging.pagesize}_page_${paging.page}`;
  let errorMsg = `Error when requesting cached data - getChannelFeaturedVideos, channelId: ${channelId}, pagesize: ${paging.pagesize}, page: ${paging.page} `;
  let callableFetch = () => {
    return ibmVideoService.getChannelFeaturedVideos(channelId, paging);
  };
  return accessCacheData(key, callableFetch, errorMsg);
};

exports.getVideosInPlaylist = function (playlistId, paging = {
  pagesize: 9,
  page: 1
}) {
  let key = `getVideosInPlaylist_${playlistId}_pagesize_${paging.pagesize}_page_${paging.page}`;
  let errorMsg = `Error when requesting cached data - getVideosInPlaylist, playlistId: ${playlistId}, pagesize: ${paging.pagesize}, page: ${paging.page} `;
  let callableFetch = () => {
    return ibmVideoService.getVideosInPlaylist(playlistId, paging);
  };
  return accessCacheData(key, callableFetch, errorMsg);
};

exports.getChannelPlaylist = function (channelId) {
  let key = `getChannelPlaylist_${channelId}`;
  let errorMsg = `Error when requesting cached data - getChannelPlaylist, channelId: ${channelId} `;
  let callableFetch = () => {
    return ibmVideoService.getChannelPlaylist(channelId);
  };
  return accessCacheData(key, callableFetch, errorMsg);
};

exports.getChannelPlaylistWithVideoCount = function (channelId, paging = {
  pagesize: 18,
  page: 1
}) {
  var self = this;
  let key = `getChannelPlaylistWithVideoCount_${channelId}_pagesize_${paging.pagesize}_page_${paging.page}`;
  let errorMsg = `Error when requesting cached data - getChannelPlaylistWithVideoCount, channelId: ${channelId}, pagesize: ${paging.pagesize}, page: ${paging.page} `;
  let callableFetch = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let pl = await ibmVideoService.getChannelPlaylist(channelId, paging);
        let promises = [];
        if (pl && pl.playlists && pl.playlists.length) {
          _.forEach(pl.playlists, (playlist) => {
            promises.push(new Promise(async (rel, rej) => {
              try {
                let videos = await self.getVideosInPlaylist(playlist.id, paging);
                if (videos && videos.paging) {
                  // console.log(`getChannelPlaylistWithVideoCount - paging `, videos.paging)
                  playlist.video_count = videos.paging.item_count;
                }
              } catch (err) {
                console.log(`getChannelPlaylistWithVideoCount `, err);
              }
              rel();
            }));
          });
        }

        return Promise.all(promises)
          .then(() => {
            return resolve(pl);
          })
          .catch(() => {
            return reject();
          });
      } catch (e) {
        return reject();
      }
    });
  };
  return accessCacheData(key, callableFetch, errorMsg);
};

exports.getChannelDetails = function (channelId) {
  let key = `getChannelDetails_${channelId}`;
  let errorMsg = `Error when requesting cached data - getChannelDetails, channelId: ${channelId} `;
  let callableFetch = () => {
    return ibmVideoService.getChannelDetails(channelId);
  };
  return accessCacheData(key, callableFetch, errorMsg);

};
exports.getUpcomingEvents = function (channelId) {
  let key = `getUpcomingEvents_${channelId}`;
  let errorMsg = `Error when requesting cached data - getChannelDetails, channelId: ${channelId} `;
  let callableFetch = () => {
    return ibmVideoService.getUpcomingEvents(channelId);
  };
  return accessCacheData(key, callableFetch, errorMsg);

};

exports.getEventInfo = function (channelId) {
  let key = `getUpcomingEvents_${channelId}`;
  let errorMsg = `Error when requesting cached data for upcoming events `;
  let callableFetch = () => {
    return ibmVideoService.getUpcomingVideo(channelId);
  };
  return accessCacheData(key, callableFetch, errorMsg);
};
