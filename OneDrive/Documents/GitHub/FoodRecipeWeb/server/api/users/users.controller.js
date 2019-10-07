'use strict';

import { User } from './users.model';

// Find all Users
export function index(req, res) {
  User.find()
    .exec()
    // This then method will only be called if the query was successful, so no need to error check!
    .then(function (users) {
      res.json(users);
    })
    .catch(function (err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one user
export function show(req, res) {
  User.findById(req.params.id)
    .exec()
    .then(function (existingUser) {
      if (existingUser) {
        // User was found by Id
        res.status(200);
        res.json(existingUser);
      } else {
        // User was not found
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new user
export function create(req, res) {
  let user = req.body;

  User.create(user)
    .then(function (createdUser) {
      res.status(201);
      res.json(createdUser);
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Update a user
export function update(req, res) {
  var updatedUser;
  // Start by trying to find the user by its id
  User.findById(req.params.id)
    .exec()
    // Update user
    .then(function (existingUser) {
      // If user exists, update all fields of the object
      if (existingUser) {
        existingUser.name.firstName = req.body.name.firstName;
        existingUser.name.lastName = req.body.name.lastName;
        existingUser.username = req.body.username;
        existingUser.email = req.body.email;
        // Set externally declared updatedUser so that later promise can return it
        updatedUser = existingUser;
        return Promise.all([
          existingUser.increment().save()
        ]);
      } else {
        // User was not found
        return null;
      }
    })
    // This .then will be called after the Promise.all resolves, or be called with null if the user was not found
    .then(function (savedObjects) {
      // savedObjects should be defined if Promise.all was invoked (user was found)
      if (savedObjects) {
        res.status(200);
        res.json(updatedUser);
      } else {
        // User was not found
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    // Error encountered during the save of the user
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a user
export function destroy(req, res) {
  User.findById(req.params.id)
    .exec()
    .then(function (existingUser) {
      if (existingUser) {
        return Promise.all([
          existingUser.remove()
        ]);
      } else {
        return null;
      }
    })
    // Delete was successful
    .then(function (deletedUser) {
      if (deletedUser) {
        res.status(204).send();
      } else {
        // User was not found
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    // user delete failed
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

