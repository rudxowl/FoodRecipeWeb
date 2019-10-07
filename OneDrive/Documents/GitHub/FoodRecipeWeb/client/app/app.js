'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';

import {
  routeConfig
} from './app.config';

import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import about from './about/about.component';
import userdetails from './userDetail/userDetail.component';
import UserService from '../components/userservice/user.module';
import updateUserModalController from '../components/updateUserModal/updateUserModal.controller';
import createUserModalController from '../components/createUserModal/createUserModal.controller';

import './app.scss';

angular.module('comp3705App', [ngCookies, ngResource, ngSanitize,
  ngRoute, uiBootstrap, main, constants, util, about, userdetails, UserService, updateUserModalController, createUserModalController
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['comp3705App'], {
      strictDi: true
    });
  });
