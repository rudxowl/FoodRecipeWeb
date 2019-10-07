'use strict';

import main from './main.component';
import {
  MainController
} from './main.component';

describe('Component: MainComponent', function() {
  beforeEach(angular.mock.module(main));

  var scope;
  var mainComponent;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, _$uibModal_, _User_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/users')
      .respond([{
        _id: '12345',
        _v: 0,
        name: {
          firstName: 'Bob',
          middleName: 'Quincy',
          lastName: 'Smith'
        },
        address: {
          addressLine1: '1234 Elm Street',
          city: 'Denver',
          state: 'Colorado',
          zip: 80202
        },
        age: 21
      }]);

    scope = $rootScope.$new();
    mainComponent = $componentController('main', {
      '$http': $http,
      'User': _User_,
      '$uibModal': _$uibModal_
    });
  }));

  it('should attach a list of users to the controller', function() {
    mainComponent.$onInit();
    $httpBackend.flush();
    expect(mainComponent.users.length)
      .to.equal(1);
  });
});
