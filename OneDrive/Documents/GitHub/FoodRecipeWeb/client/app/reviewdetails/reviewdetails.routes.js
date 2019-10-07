'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/recipes/:recipeid/reviews/:reviewid', {
    template: '<reviewdetails></reviewdetails>'
  });
}
