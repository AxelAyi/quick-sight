(function() {
  'use strict';

  angular
    .module('quickSight')
    .factory('feedConnectors', feedConnectors);

  feedConnectors.$inject = [];

  function feedConnectors() {

    var feeds = {};

    var service = {
      register: register,
      get: get
    };

    return service;

    ////////

    function register(feedName, feedService) {
      feeds[feedName] = feedService;
    }

    function get(feedName) {
      return feeds[feedName];
    }
  }
})();
