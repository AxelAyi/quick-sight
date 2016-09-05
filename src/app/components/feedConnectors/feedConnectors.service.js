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
      get: get,
      getFeeds: getFeeds
    };

    return service;

    ////////

    function register(feedService) {
      feeds[feedService.name] = feedService;
    }

    function get(feedName) {
      return feeds[feedName];
    }

    function getFeeds() {
      var feedArr = Object.keys(feeds).map(function(key) {
        return feeds[key];
      });
      return Object.freeze(feedArr);
    }
  }
})();
