const ibmService = require('../services/cachable-ibm-video-service');
const numeral = require('numeral');
const _ = require('lodash');
const PLAYLIST_MOST_WATCHED = process.env.PLAYLIST_MOST_WATCHED || '';
const PLAYLIST_RECENT_EVENT = process.env.PLAYLIST_RECENT_EVENT || '';
const PLAYLIST_UPCOMING_EVENTS = process.env.PLAYLIST_UPCOMING_EVENTS || '';
const defaultText = require('../config/languagesText')
const defaultConfig = require('../config/defaultConfig')

async function handleChannelPageRequest(req, res, { channelId },language) {
  const language_string = `channel_${language}`
  try {
    let result = await ibmService.getChannelDetails(channelId);
    if (result && result.channel) {
      console.log('results received')
      let playlists = await ibmService.getChannelPlaylist(channelId);
      let upcomingEvents = await ibmService.getUpcomingEvents(channelId);
      console.log(playlists)
      console.log(upcomingEvents.events);
      let plMostWatched = '';
      let plRecentEvents = '';
      let plUpcomingEvents = '';

      // console.log(`playlist found `, playlists.playlists);
      if (playlists && playlists.playlists && playlists.playlists.length) {
        _.forEach(playlists.playlists, function (pl) {
          let lowerCaseTitle = pl.title.toLowerCase();
          // console.log(`playlist most watched found : `, lowerCaseTitle, pl.id, lowerCaseTitle.trim() == PLAYLIST_MOST_WATCHED.trim().toLowerCase());
          if (!plMostWatched && lowerCaseTitle.trim() == PLAYLIST_MOST_WATCHED.trim()
            .toLowerCase()) {
            plMostWatched = pl.id;
          }
          // console.log(`playlist recent events found : `, lowerCaseTitle, pl.id, lowerCaseTitle.trim() == PLAYLIST_RECENT_EVENT.trim().toLowerCase());
          if (!plRecentEvents && lowerCaseTitle.trim() == PLAYLIST_RECENT_EVENT.trim()
            .toLowerCase()) {
            plRecentEvents = pl.id;
          }
          // console.log(`playlist recent events found : `, lowerCaseTitle, pl.id, lowerCaseTitle.trim() == PLAYLIST_RECENT_EVENT.trim().toLowerCase());

        });

        _.forEach(upcomingEvents.events, function (event) {

          let lowerCaseTitle = event.title.toLowerCase();
          plUpcomingEvents = event.id;
          if (!plUpcomingEvents && lowerCaseTitle.trim() == PLAYLIST_UPCOMING_EVENTS.trim()
            .toLowerCase()) {

          }
          console.log('This is the array list' + plUpcomingEvents);

        });

      }
      res.render('channel', {
        title: 'On Demand',
        channelId: channelId,
        channelTitle: result.channel.title,
        channelTotalView: result.channel.stats && result.channel.stats.viewer_total ? numeral(result.channel.stats.viewer_total)
          .format('0,0') : 0,
        siteBaseUrl: `${process.env.BASE_URL}`,
        plIdMostWatched: plMostWatched,
        plIdRecentEvents: plRecentEvents,
        plIdUpcomingEvents: plUpcomingEvents,
        headerMenu:defaultText[req.params.language].menuHeader,
        language:defaultText[req.params.language].language,
        footer:defaultConfig.socialMedia
      });
    } else {
      return res.status(404)
        .send();
    }
  } catch (e) {
    console.error(`error when requesting channel details `, e);
    return res.status(404)
      .send();
  }
}

exports.ondemand = async (req, res) => {

  let channelId = process.env.HOME_CHANNEL_ID;
  console.log(`home channel id: `, channelId);

  if (!channelId) {
    return res.status(400)
      .send('Home channel Id needed');
  }

    await handleChannelPageRequest(req, res, { channelId }, req.params.language);

}
/**
 * GET /channel/:id
 * Home page.
 */
exports.index = async (req, res) => {
  let channelId = req.params.id;
  console.log(`channel id: `, channelId);

  await handleChannelPageRequest(req, res, { channelId })
};
