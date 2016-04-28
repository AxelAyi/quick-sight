(function() {
  'use strict';

  angular
    .module('quickSight')
    .run(artStation);

  artStation.$inject = ['feedConnectors', '$resource', '$q', '$log'];

  function artStation(feedConnectors, $resource, $q, $log) {
    var url = "https://www.artstation.com/projects.json?page=:page&sorting=picks";
    var data = $resource(url, {});
    var staticSize = 0;
    var service = {
      fetch: fetch,
      count: 300
    };

    feedConnectors.register("Art Station", service);

    return service;

    ///////////

    function fetch(offset, size) {
      var deferred = $q.defer();

      size = staticSize;
      var page = offset / size + 1;

      data.get({
        page: page
      }, function(feeds) {
        staticSize = feeds.data.length;
        var result = feeds.data.map(function(item) {
          return {
            title: item.title,
            url: item.permalink,
            image: item.cover.thumb_url,
            likes: item.likes_count,
            views: item.views_count
          };
        });

        deferred.resolve(result);
      });

      return deferred.promise;
    }
  }
})();
