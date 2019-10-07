'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/recipes/:id', {
    template: '<recipedetails></recipedetails>'
  });
}
