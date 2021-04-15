// const { promisify } = require('util');
// const cheerio = require('cheerio');
// const graph = require('fbgraph');
// const { LastFmNode } = require('lastfm');
// const tumblr = require('tumblr.js');
// const GitHub = require('@octokit/rest');
// const Twit = require('twit');
// const stripe = require('stripe')(process.env.STRIPE_SKEY);
// const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
// const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
// const paypal = require('paypal-rest-sdk');
// const lob = require('lob')(process.env.LOB_KEY);
// const ig = require('instagram-node').instagram();
// const axios = require('axios');
// const { google } = require('googleapis');
// const Quickbooks = require('node-quickbooks');
// const validator = require('validator');
const ibmApiService = require('../services/cachable-ibm-video-service');
const _ = require('lodash');

// Quickbooks.setOauthVersion('2.0');

exports.getPlaylistFeatured = async (req, res) => {
  let channelId = req.params.channelId;
  let { pagesize, page } = req.query;
  // console.log(`playlist featured channel id: `, channelId)
  try {
    let playlists = await ibmApiService.getChannelPlaylistWithVideoCount(channelId, {
      page,
      pagesize
    });
    return res.json({
      data: playlists
    });
  } catch (e) {
    console.error(`Error when getPlaylistFeatured - channeldId: ${channelId}, pagesize: ${pagesize}, page: ${page} - `, e);
    return res.json({
      data: {
        playlists: [],
        'paging': {
          'page_count': 0,
          'item_count': 0
        }
      }
    });
  }
  /*res.json({
      data: {
          "playlists": [
              {
                  "id": "589939",
                  "title": "Most Watched",
                  "behavior": "static",
                  "total_duration": "413.757",
                  "thumbnail": {
                      "default": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,192x108,b,1:2.jpg",
                      "image_192x108": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,192x108,b,1:2.jpg",
                      "image_112x63": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,112x63,b,1:2.jpg",
                      "image_128x72": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,128x72,b,1:2.jpg",
                      "image_256x144": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,256x144,b,1:2.jpg",
                      "image_320x180": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,320x180,b,1:2.jpg",
                      "image_640x360": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,640x360,b,1:2.jpg",
                      "image_1920x1080": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,1920x1080,b,1:2.jpg"
                  },
                  "created_at": 1571835778,
                  "updated_at": 1573820908,
                  "channel_id": "23711860"
              },
              {
                  "id": "589935",
                  "title": "Recent Events",
                  "behavior": "static",
                  "total_duration": "470.994",
                  "thumbnail": {
                      "default": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347197/1_23711860_124347197,192x108,b,1:2.jpg",
                      "image_192x108": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347197/1_23711860_124347197,192x108,b,1:2.jpg",
                      "image_112x63": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347197/1_23711860_124347197,112x63,b,1:2.jpg",
                      "image_128x72": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347197/1_23711860_124347197,128x72,b,1:2.jpg",
                      "image_256x144": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347197/1_23711860_124347197,256x144,b,1:2.jpg",
                      "image_320x180": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347197/1_23711860_124347197,320x180,b,1:2.jpg",
                      "image_640x360": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347197/1_23711860_124347197,640x360,b,1:2.jpg",
                      "image_1920x1080": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347197/1_23711860_124347197,1920x1080,b,1:2.jpg"
                  },
                  "created_at": 1571833983,
                  "updated_at": 1573820823,
                  "channel_id": "23711860"
              },
              {
                  "id": "589940",
                  "title": "Meet The Team",
                  "behavior": "static",
                  "total_duration": "99.284",
                  "thumbnail": {
                      "default": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124349/124349265/1_23711860_124349265,192x108,b,1:2.jpg",
                      "image_192x108": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124349/124349265/1_23711860_124349265,192x108,b,1:2.jpg",
                      "image_112x63": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124349/124349265/1_23711860_124349265,112x63,b,1:2.jpg",
                      "image_128x72": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124349/124349265/1_23711860_124349265,128x72,b,1:2.jpg",
                      "image_256x144": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124349/124349265/1_23711860_124349265,256x144,b,1:2.jpg",
                      "image_320x180": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124349/124349265/1_23711860_124349265,320x180,b,1:2.jpg",
                      "image_640x360": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124349/124349265/1_23711860_124349265,640x360,b,1:2.jpg",
                      "image_1920x1080": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124349/124349265/1_23711860_124349265,1920x1080,b,1:2.jpg"
                  },
                  "created_at": 1571835804,
                  "updated_at": 1571842480,
                  "channel_id": "23711860"
              },
              {
                  "id": "589938",
                  "title": "CrewStudio Guides",
                  "behavior": "static",
                  "total_duration": "241.400",
                  "thumbnail": {
                      "default": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347397/1_23711860_124347397,192x108,b,1:2.jpg",
                      "image_192x108": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347397/1_23711860_124347397,192x108,b,1:2.jpg",
                      "image_112x63": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347397/1_23711860_124347397,112x63,b,1:2.jpg",
                      "image_128x72": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347397/1_23711860_124347397,128x72,b,1:2.jpg",
                      "image_256x144": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347397/1_23711860_124347397,256x144,b,1:2.jpg",
                      "image_320x180": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347397/1_23711860_124347397,320x180,b,1:2.jpg",
                      "image_640x360": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347397/1_23711860_124347397,640x360,b,1:2.jpg",
                      "image_1920x1080": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347397/1_23711860_124347397,1920x1080,b,1:2.jpg"
                  },
                  "created_at": 1571835621,
                  "updated_at": 1571835637,
                  "channel_id": "23711860"
              }
          ],
          "paging": {
              "page_count": 1,
              "item_count": 4
          }
      }
  })*/
};


exports.getVideoListChannelFeatured = async (req, res) => {
  const channelId = req.params.channelId;
  const { pagesize, page } = req.query;
  try {
    let videos = await ibmApiService.getChannelFeaturedVideos(channelId, {
      pagesize,
      page
    });
    return res.json({ data: videos });
  } catch (e) {
    console.log(`Error when requesting channel featured videos - channelId: ${channelId}, pagesize: ${pagesize}, page: ${page} - `, e);
    return res.json({
      data: {
        videos: [],
        'paging': {
          'page_count': 0,
          'item_count': 0
        }
      }
    });
  }
};

exports.getPlaylistDetails = async (req, res) => {
  let { channelId, playlistId } = req.params;
  if (!channelId || !playlistId) {
    return res.json({
      data: null
    });
  }

  try {
    let playlist = await ibmApiService.getPlaylistDetails(playlistId);
    return res.json({ data: playlist });
  } catch (e) {
    console.log(`Failed to get playlist details`, e);
    return res.json({
      data: null
    });

  }
};

exports.getPlaylistVideos = async (req, res) => {
  let channelId = req.params.channelId;
  let playlistId = req.params.playlistId;
  let { pagesize, page } = req.query;
  // console.log(`getPlaylistVideos ${pagesize} ${page}`)

  if (!channelId || !playlistId) {
    return res.json({
      data: {
        videos: [],
        'paging': {
          'page_count': 0,
          'item_count': 0
        }
      }
    });
  }
  try {
    if (playlistId == 'featured') {
      let videos = await ibmApiService.getChannelFeaturedVideos(channelId);
      return res.json({ data: videos });
    } else {
      let videos = await ibmApiService.getVideosInPlaylist(playlistId, {
        pagesize,
        page
      });
      return res.json({ data: videos });
    }

  } catch (e) {
    console.log(`Failed to get videos of video list`, e);
    return res.json({
      data: {
        videos: [],
        'paging': {
          'page_count': 0,
          'item_count': 0
        }
      }
    });

  }
};

exports.getVideoListRecentEvents = (req, res) => {
  const channelId = req.params.channelId;
  return getVideoList(req, res, process.env.PLAYLIST_RECENT_EVENT, `Error when requesting recent events video list - channelId: ${channelId} - `);
};


exports.getVideoListMostWatched = async (req, res) => {
  const channelId = req.params.channelId;
  return getVideoList(req, res, process.env.PLAYLIST_MOST_WATCHED, `Error when requesting most watched video list - channelId: ${channelId} - `);
};


exports.getUpcomingEvents = async (req, res) => {
  const channelId = req.params.channelId;
  return getVideoList(req, res, process.env.PLAYLIST_UPCOMING_EVENTS, `Error when requesting most upcoming event list - channelId: ${channelId} - `);
};



async function getVideoList(req, res, searchTitle, errMsg) {
  let channelId = req.params.channelId;
  // console.log(`most watched: `, channelId);
  let foundPlaylist = null;
  try {
    let playlists = await ibmApiService.getChannelPlaylist(channelId);
    if (playlists && playlists.playlists && playlists.playlists.length && searchTitle) {
      foundPlaylist = _.find(playlists.playlists, (pl) => {
        return pl.title.toLowerCase() == searchTitle.toLowerCase();
      });
    }

    if (foundPlaylist && foundPlaylist.id) {
      let videos = await ibmApiService.getVideosInPlaylist(foundPlaylist.id);
      return res.json({ data: videos });
    } else {
      return res.json({
        data: {
          videos: [],
          'paging': {
            'page_count': 0,
            'item_count': 0
          }
        }
      });
    }

  } catch (e) {
    console.log(errMsg, e);
    return res.json({
      data: {
        videos: [],
        'paging': {
          'page_count': 0,
          'item_count': 0
        }
      }
    });

  }
  /*res.json({
      data: {
          "videos": [
              {
                  "id": "124347309",
                  "title": "Rubie in the Rubble Entrepreneur",
                  "description": "",
                  "url": "https://video.ibm.com/recorded/124347309",
                  "length": "91.797",
                  "created_at": 1571830966,
                  "added_at": 1571830966,
                  "file_size": "15924736",
                  "views": 5,
                  "protect": "public",
                  "thumbnail": {
                      "default": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,192x108,b,1:2.jpg",
                      "image_192x108": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,192x108,b,1:2.jpg",
                      "image_112x63": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,112x63,b,1:2.jpg",
                      "image_128x72": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,128x72,b,1:2.jpg",
                      "image_256x144": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,256x144,b,1:2.jpg",
                      "image_320x180": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,320x180,b,1:2.jpg",
                      "image_640x360": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,640x360,b,1:2.jpg",
                      "image_1920x1080": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347309/1_23711860_124347309,1920x1080,b,1:2.jpg"
                  },
                  "media_urls": {
                      "flv": null
                  },
                  "links": {
                      "channel": {
                          "href": "https://api.video.ibm.com/channels/23711860.json",
                          "id": "23711860"
                      }
                  },
                  "chapters": [],
                  "tinyurl": "https://video.ibm.com/recorded/124347309",
                  "schedule": null,
                  "owner": {
                      "id": "43759836",
                      "username": "fuj734yhfv2",
                      "picture": "https://ustvstaticcdn1-a.akamaihd.net/i/user/picture/4/3/7/5/43759836/43759836_20190625_115656_1565011951,48x48,r:1.jpg"
                  },
                  "locks": {}
              },
              {
                  "id": "124347327",
                  "title": "People Management Essentials Curriculum",
                  "description": "",
                  "url": "https://video.ibm.com/recorded/124347327",
                  "length": "172.992",
                  "created_at": 1571831114,
                  "added_at": 1571831114,
                  "file_size": "30964137",
                  "views": 3,
                  "protect": "public",
                  "thumbnail": {
                      "default": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347327/1_23711860_124347327,192x108,b,1:2.jpg",
                      "image_192x108": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347327/1_23711860_124347327,192x108,b,1:2.jpg",
                      "image_112x63": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347327/1_23711860_124347327,112x63,b,1:2.jpg",
                      "image_128x72": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347327/1_23711860_124347327,128x72,b,1:2.jpg",
                      "image_256x144": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347327/1_23711860_124347327,256x144,b,1:2.jpg",
                      "image_320x180": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347327/1_23711860_124347327,320x180,b,1:2.jpg",
                      "image_640x360": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347327/1_23711860_124347327,640x360,b,1:2.jpg",
                      "image_1920x1080": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347327/1_23711860_124347327,1920x1080,b,1:2.jpg"
                  },
                  "media_urls": {
                      "flv": null
                  },
                  "links": {
                      "channel": {
                          "href": "https://api.video.ibm.com/channels/23711860.json",
                          "id": "23711860"
                      }
                  },
                  "chapters": [],
                  "tinyurl": "https://video.ibm.com/recorded/124347327",
                  "schedule": null,
                  "owner": {
                      "id": "43759836",
                      "username": "fuj734yhfv2",
                      "picture": "https://ustvstaticcdn1-a.akamaihd.net/i/user/picture/4/3/7/5/43759836/43759836_20190625_115656_1565011951,48x48,r:1.jpg"
                  },
                  "locks": {}
              },
              {
                  "id": "124347374",
                  "title": "WTV Production Showreel 2018",
                  "description": "",
                  "url": "https://video.ibm.com/recorded/124347374",
                  "length": "72.661",
                  "created_at": 1571831435,
                  "added_at": 1571831435,
                  "file_size": "19892004",
                  "views": 0,
                  "protect": "public",
                  "thumbnail": {
                      "default": "https://ustvstaticcdn1-a.akamaihd.net/i/video/picture/0/1/124/124347/124347374/1_23711860_124347374,192x108,b,1:2.jpg",
                      "image_192x108": "https://ustvstaticcdn1-a.akamaihd.net/i/video/picture/0/1/124/124347/124347374/1_23711860_124347374,192x108,b,1:2.jpg",
                      "image_112x63": "https://ustvstaticcdn1-a.akamaihd.net/i/video/picture/0/1/124/124347/124347374/1_23711860_124347374,112x63,b,1:2.jpg",
                      "image_128x72": "https://ustvstaticcdn1-a.akamaihd.net/i/video/picture/0/1/124/124347/124347374/1_23711860_124347374,128x72,b,1:2.jpg",
                      "image_256x144": "https://ustvstaticcdn1-a.akamaihd.net/i/video/picture/0/1/124/124347/124347374/1_23711860_124347374,256x144,b,1:2.jpg",
                      "image_320x180": "https://ustvstaticcdn1-a.akamaihd.net/i/video/picture/0/1/124/124347/124347374/1_23711860_124347374,320x180,b,1:2.jpg",
                      "image_640x360": "https://ustvstaticcdn1-a.akamaihd.net/i/video/picture/0/1/124/124347/124347374/1_23711860_124347374,640x360,b,1:2.jpg",
                      "image_1920x1080": "https://ustvstaticcdn1-a.akamaihd.net/i/video/picture/0/1/124/124347/124347374/1_23711860_124347374,1920x1080,b,1:2.jpg"
                  },
                  "media_urls": {
                      "flv": null
                  },
                  "links": {
                      "channel": {
                          "href": "https://api.video.ibm.com/channels/23711860.json",
                          "id": "23711860"
                      }
                  },
                  "chapters": [],
                  "tinyurl": "https://video.ibm.com/recorded/124347374",
                  "schedule": null,
                  "owner": {
                      "id": "43759836",
                      "username": "fuj734yhfv2",
                      "picture": "https://ustvstaticcdn1-a.akamaihd.net/i/user/picture/4/3/7/5/43759836/43759836_20190625_115656_1565011951,48x48,r:1.jpg"
                  },
                  "locks": {}
              },
              {
                  "id": "124347395",
                  "title": "Communicating During Hard Times",
                  "description": "",
                  "url": "https://video.ibm.com/recorded/124347395",
                  "length": "76.307",
                  "created_at": 1571831601,
                  "added_at": 1571831601,
                  "file_size": "21255242",
                  "views": 0,
                  "protect": "public",
                  "thumbnail": {
                      "default": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347395/1_23711860_124347395,192x108,b,1:2.jpg",
                      "image_192x108": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347395/1_23711860_124347395,192x108,b,1:2.jpg",
                      "image_112x63": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347395/1_23711860_124347395,112x63,b,1:2.jpg",
                      "image_128x72": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347395/1_23711860_124347395,128x72,b,1:2.jpg",
                      "image_256x144": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347395/1_23711860_124347395,256x144,b,1:2.jpg",
                      "image_320x180": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347395/1_23711860_124347395,320x180,b,1:2.jpg",
                      "image_640x360": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347395/1_23711860_124347395,640x360,b,1:2.jpg",
                      "image_1920x1080": "https://ustvstaticcdn2-a.akamaihd.net/i/video/picture/0/1/124/124347/124347395/1_23711860_124347395,1920x1080,b,1:2.jpg"
                  },
                  "media_urls": {
                      "flv": null
                  },
                  "links": {
                      "channel": {
                          "href": "https://api.video.ibm.com/channels/23711860.json",
                          "id": "23711860"
                      }
                  },
                  "chapters": [],
                  "tinyurl": "https://video.ibm.com/recorded/124347395",
                  "schedule": null,
                  "owner": {
                      "id": "43759836",
                      "username": "fuj734yhfv2",
                      "picture": "https://ustvstaticcdn1-a.akamaihd.net/i/user/picture/4/3/7/5/43759836/43759836_20190625_115656_1565011951,48x48,r:1.jpg"
                  },
                  "locks": {}
              }
          ],
          "paging": {
              "page_count": 1,
              "item_count": 4
          }
      }
  })*/
}

