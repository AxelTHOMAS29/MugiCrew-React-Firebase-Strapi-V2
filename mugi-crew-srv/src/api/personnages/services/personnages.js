'use strict';

/**
 * personnages service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::personnages.personnages');
