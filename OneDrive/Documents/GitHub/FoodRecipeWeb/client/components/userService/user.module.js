'use strict';

import angular from 'angular';
import resource from 'angular-resource';
import {
  UserService
} from './user.service';

export default angular.module('comp3705App.user', [resource])
  .factory('User', UserService)
  .name;

