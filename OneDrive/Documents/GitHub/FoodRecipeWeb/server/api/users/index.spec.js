'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var usersCtrlStub = {
  index: 'usersCtrl.index',
  show: 'usersCtrl.show',
  create: 'usersCtrl.create',
  update: 'usersCtrl.update',
  patch: 'usersCtrl.patch',
  destroy: 'usersCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var usersIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './users.controller': usersCtrlStub
});

describe('Users API Router:', function() {
  it('should return an express router instance', function() {
    expect(usersIndex.router).to.equal(routerStub);
  });

  describe('GET /api/users', function() {
    it('should route to users.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'usersCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/users/:id', function() {
    it('should route to users.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'usersCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/users', function() {
    it('should route to users.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'usersCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/users/:id', function() {
    it('should route to users.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'usersCtrl.update')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/users/:id', function() {
    it('should route to users.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'usersCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
