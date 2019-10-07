import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './userDetail.routes';
import user from '../../components/userService/user.module';

export class UserDetailController {
  /*@ngInject*/
  constructor($routeParams, User) {
    this.User = User;
    this.$routeParams = $routeParams;
    this.getUserData();
  }

  getUserData() {
    this.User.getUserById(this.$routeParams.id)
      .then(response => {
        this.user = response;
      })
      .catch(error => {
        console.error(error);
      });
  }

  $onInit() {

  }
}

export default angular.module('comp3705App.userDetail', [ngRoute, user])
  .config(routing)
  .component('userDetail', {
    template: require('./userDetail.html'),
    controller: UserDetailController,
    controllerAs: 'userDetailController'
  })
  .name;
