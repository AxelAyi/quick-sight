(function() {
  'use strict';

  angular
    .module('quickSight')
    .run(sketchFab);

  sketchFab.$inject = ['feedConnectors', '$resource', '$q', '$log'];

  function sketchFab(feedConnectors, $resource, $q, $log) {
    var data = $resource('https://sketchfab.com/i/models?count=:size&date=7&offset=:offset&sort_by=-likeCount', {});
    var service = {
      fetch: fetch,
      count: 300
    };

    feedConnectors.register("sketchFab", service);

    return service;

    ///////////

    function fetch(offset, size) {
      var deferred = $q.defer();

      data.get({
        offset: offset,
        size: size
      }, function(feeds) {
        var result = feeds.results.map(function(item) {
          return {
            title: item.name,
            image: item.thumbnails.images[3].url,
            likes: item.likeCount,
            views: item.viewCount,
            url: item.viewerUrl
          };
        });

        deferred.resolve(result);
      });

      return deferred.promise;
    }
  }
})();
