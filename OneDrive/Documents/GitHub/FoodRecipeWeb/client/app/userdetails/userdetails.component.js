import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './userdetails.routes';
import { UserService } from '../main/main.component';

export class UserDetailsController {
  /*@ngInject*/
  // appconfig from shared.js
  constructor($routeParams, User) {
    this.id = $routeParams.id;
    this.User = User;

    this.User.getUserByID(this.id)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.error(error);
      })
  }

  $onInit() { }

}

export default angular.module('comp3705App.userdetails', [ngRoute])
  .config(routing)
  .component('userdetails', {
    template: require('./userdetails.html'),
    controller: UserDetailsController,
    controllerAs: 'userDetailsController'
  })
  .service('User', UserService)
  .name;
