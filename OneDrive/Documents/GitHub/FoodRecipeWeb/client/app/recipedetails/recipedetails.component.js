import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipedetails.routes';
import { RecipeService } from '../main/main.component';

export class RecipeDetailsController {
  /*@ngInject*/
  // appconfig from shared.js
  constructor($routeParams, Recipe) {
    this.id = $routeParams.id;
    this.Recipe = Recipe;

    this.Recipe.getRecipeByID(this.id)
      .then(response => {
        this.recipe = response.data;
      })
      .catch(error => {
        console.error(error);
      })
  }

  $onInit() { }

}

export default angular.module('comp3705App.recipedetails', [ngRoute])
  .config(routing)
  .component('recipedetails', {
    template: require('./recipedetails.html'),
    controller: RecipeDetailsController,
    controllerAs: 'recipeDetailsController'
  })
  .service('Recipe', RecipeService)
  .name;
