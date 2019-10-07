import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './reviewdetails.routes';
import { ReviewService } from '../main/main.component';

export class ReviewDetailsController {
  /*@ngInject*/
  // appconfig from shared.js
  constructor($routeParams, Review) {
    this.recipeid = $routeParams.recipeid;
    this.reviewid = $routeParams.reviewid;
    this.Review = Review;

    this.Review.getReviewByID(this.recipeid, this.reviewid)
      .then(response => {
        this.review = response.data;
      })
      .catch(error => {
        console.error(error);
      })
  }

  $onInit() { }

}

export default angular.module('comp3705App.reviewdetails', [ngRoute])
  .config(routing)
  .component('reviewdetails', {
    template: require('./reviewdetails.html'),
    controller: ReviewDetailsController,
    controllerAs: 'reviewDetailsController'
  })
  .service('Review', ReviewService)
  .name;
