const createCrudController = require('./crudController');
const Announcement = require('../models/Announcement');
const GalleryItem = require('../models/GalleryItem');
const News = require('../models/News');
const PlayerStatistic = require('../models/PlayerStatistic');
const Rule = require('../models/Rule');
const ServerStatus = require('../models/ServerStatus');
const StaffMember = require('../models/StaffMember');

module.exports = {
  announcements: createCrudController(Announcement, {
    writableFields: ['title', 'message', 'severity', 'startsAt', 'endsAt', 'isActive'],
    publicFilter: { isActive: true },
    createExtras: (req) => ({ createdBy: req.user._id })
  }),
  gallery: createCrudController(GalleryItem, {
    writableFields: ['title', 'imageUrl', 'caption', 'category', 'displayOrder', 'isPublished'],
    publicFilter: { isPublished: true },
    defaultSort: 'displayOrder -createdAt'
  }),
  news: createCrudController(News, {
    writableFields: ['title', 'slug', 'summary', 'content', 'imageUrl', 'isPublished', 'publishedAt'],
    publicFilter: { isPublished: true },
    defaultSort: '-publishedAt',
    createExtras: (req) => ({ author: req.user._id }),
    populate: 'author username'
  }),
  playerStats: createCrudController(PlayerStatistic, {
    writableFields: ['playerName', 'uuid', 'rank', 'kills', 'deaths', 'playtimeMinutes', 'score', 'lastSeenAt'],
    defaultSort: '-score'
  }),
  rules: createCrudController(Rule, {
    writableFields: ['title', 'description', 'category', 'displayOrder', 'isActive'],
    publicFilter: { isActive: true },
    defaultSort: 'displayOrder createdAt'
  }),
  serverStatus: createCrudController(ServerStatus, {
    writableFields: ['serverName', 'host', 'port', 'status', 'currentPlayers', 'maxPlayers', 'version', 'motd', 'lastCheckedAt'],
    defaultSort: 'serverName'
  }),
  staff: createCrudController(StaffMember, {
    writableFields: ['name', 'role', 'bio', 'avatarUrl', 'displayOrder', 'isActive'],
    publicFilter: { isActive: true },
    defaultSort: 'displayOrder createdAt'
  })
};
