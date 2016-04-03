'use strict';

angular
  .module('quickSight')
  .factory('feedConnectors', feedConnectors);

feedConnectors.$inject = ['cgSociety', 'mockFeed'];

function feedConnectors(cgSociety, mockFeed) {
  var service = {
    cgSociety: cgSociety,
    mockFeed: mockFeed
  };

  return service;
}
