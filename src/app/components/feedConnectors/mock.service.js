(function() {
  'use strict';

  angular
    .module('quickSight')
    .factory('mockFeed', mockFeed);

  mockFeed.$injector = ['$log', '$q'];

  function mockFeed($log, $q) {
    var service = {
      fetch: fetch
    };

    return service;

    ///////////

    function fetch(page, size) {
      var deferred = $q.defer();
      // Mock values
      var offset = page * size;

      var thumbnails = [];
      for (var i = offset; i < offset + size; i++) {
        thumbnails.push(getThumbnail(i));
      }

      deferred.resolve(thumbnails);

      return deferred.promise;
    }

    function getThumbnail(id) {
      return {
        url: 'assets/images/samples/img' + id + '.jpg',
        source: 'mock'
    };
    }
  }
})();
