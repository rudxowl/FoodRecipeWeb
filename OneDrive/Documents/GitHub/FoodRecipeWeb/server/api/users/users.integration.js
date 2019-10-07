'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

describe('Users API:', function() {
  let createdUser;
  let updatedUser;

  describe('GET /api/users', function() {
    it('should respond with JSON array', function() {
      return request(app)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          expect(response.body).to.be.instanceOf(Array);
        });
    });
  });

  describe('POST /api/users', function() {
    let newUser = {
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
    };

    it('should respond with the newly created user', function() {
      return request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /json/)
        .then(response => {
          createdUser = response.body;
          expect(createdUser._id).to.exist;
          expect(createdUser.name.firstName).to.equal(newUser.name.firstName);
          expect(createdUser.name.middleName).to.equal(newUser.name.middleName);
          expect(createdUser.address.addressLine1).to.equal(newUser.address.addressLine1);
          expect(createdUser.address.city).to.equal(newUser.address.city);
          expect(createdUser.address.state).to.equal(newUser.address.state);
          expect(createdUser.address.zip).to.equal(newUser.address.zip);
          expect(createdUser.age).to.equal(newUser.age);
        });
    });
  });

  describe('GET /api/users/:id', function() {
    it('should respond with the requested user', function() {
      return request(app)
        .get(`/api/users/${createdUser._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          let retrievedUser = response.body;
          expect(retrievedUser._id).to.equal(createdUser._id);
          expect(retrievedUser.name.firstName).to.equal(createdUser.name.firstName);
          expect(retrievedUser.name.middleName).to.equal(createdUser.name.middleName);
          expect(retrievedUser.address.addressLine1).to.equal(createdUser.address.addressLine1);
          expect(retrievedUser.address.city).to.equal(createdUser.address.city);
          expect(retrievedUser.address.state).to.equal(createdUser.address.state);
          expect(retrievedUser.address.zip).to.equal(createdUser.address.zip);
          expect(retrievedUser.age).to.equal(createdUser.age);
        });
    });
  });

  describe('PUT /api/users/:id', function() {
    let updatedFields = {
      name: {
        firstName: 'Bob1',
        middleName: 'Quincy1',
        lastName: 'Smith1'
      },
      address: {
        addressLine1: '1234 Elm Street1',
        city: 'Denver1',
        state: 'Colorado1',
        zip: 80203
      },
      age: 22
    };
    it('should respond with the updated user', function() {
      return request(app)
        .put(`/api/users/${createdUser._id}`)
        .send(updatedFields)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          updatedUser = response.body;
          expect(updatedUser._id).to.equal(createdUser._id);
          expect(updatedUser.name.firstName).to.equal(updatedFields.name.firstName);
          expect(updatedUser.name.middleName).to.equal(updatedFields.name.middleName);
          expect(updatedUser.address.addressLine1).to.equal(updatedFields.address.addressLine1);
          expect(updatedUser.address.city).to.equal(updatedFields.address.city);
          expect(updatedUser.address.state).to.equal(updatedFields.address.state);
          expect(updatedUser.address.zip).to.equal(updatedFields.address.zip);
          expect(updatedUser.age).to.equal(updatedFields.age);
        });
    });

    it('should respond with the updated user on a subsequent GET', function() {
      return request(app)
        .get(`/api/users/${createdUser._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          let retrievedUser = response.body;
          expect(retrievedUser._id).to.equal(createdUser._id);
          expect(retrievedUser.name.firstName).to.equal(updatedFields.name.firstName);
          expect(retrievedUser.name.middleName).to.equal(updatedFields.name.middleName);
          expect(retrievedUser.address.addressLine1).to.equal(updatedFields.address.addressLine1);
          expect(retrievedUser.address.city).to.equal(updatedFields.address.city);
          expect(retrievedUser.address.state).to.equal(updatedFields.address.state);
          expect(retrievedUser.address.zip).to.equal(updatedFields.address.zip);
          expect(retrievedUser.age).to.equal(updatedFields.age);
        });
    });
  });

  describe('DELETE /api/users/:id', function() {
    it('should respond with 204 on successful removal', function() {
      return request(app)
        .delete(`/api/users/${createdUser._id}`)
        .expect(204)
        .then(response => {
        });
    });

    it('should respond with 404 when user does not exist', function() {
      return request(app)
        .delete(`/api/users/${createdUser._id}`)
        .expect(404)
        .then(response => {
        });
    });
  });
});
