'use strict';

const restrictToSender = require('./restrict-to-sender');

const auth = require('feathers-authentication').hooks;
const hooks = require('feathers-hooks');

const process = require('./process');
const globalHooks = require('../../../hooks');
const populateSender = hooks.populate('sentBy', {
  service: 'users',
  field: 'userId'
});

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [process()],
  update: [restrictToSender(), hooks.remove('sentBy')],
  patch: [restrictToSender(), hooks.remove('sentBy')],
  remove: [restrictToSender()]
};

exports.after = {
  all: [],
  find: [populateSender],
  get: [populateSender],
  create: [populateSender],
  update: [],
  patch: [],
  remove: []
};
