'use strict';

var config = browser.params;

describe('Main View', function() {
  var page;

  beforeEach(function() {
    let promise = browser.get(config.baseUrl + '/');
    page = require('./main.po');
    return promise;
  });

  it('should have the correct page header', function() {
    expect(page.pageHeader.getText()).to.eventually.equal('Lab 17 - Automated Testing');
  });
});
