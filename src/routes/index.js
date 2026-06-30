const express = require('express');

const authRoutes = require('./authRoutes');
const announcementRoutes = require('./announcementRoutes');
const contactRoutes = require('./contactRoutes');
const galleryRoutes = require('./galleryRoutes');
const newsRoutes = require('./newsRoutes');
const playerStatisticRoutes = require('./playerStatisticRoutes');
const ruleRoutes = require('./ruleRoutes');
const serverStatusRoutes = require('./serverStatusRoutes');
const staffRoutes = require('./staffRoutes');
const assistantRoutes = require('./assistantRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/news', newsRoutes);
router.use('/announcements', announcementRoutes);
router.use('/staff', staffRoutes);
router.use('/server-status', serverStatusRoutes);
router.use('/player-statistics', playerStatisticRoutes);
router.use('/rules', ruleRoutes);
router.use('/gallery', galleryRoutes);
router.use('/contact-messages', contactRoutes);
router.use('/assistant', assistantRoutes);

module.exports = router;
