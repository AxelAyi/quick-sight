(function() {
  'use strict';

  angular
    .module('quickSight')
    .run(cgSociety);

  cgSociety.$inject = ['feedConnectors', '$resource', '$q', '$log'];

  function cgSociety(feedConnectors, $resource, $q, $log) {
    var data = $resource('http://www.cgsociety.org/ajax/gallery_json.php?page=:page&per=:size', {});
    var service = {
      fetch: fetch,
      count: 300
    };

    feedConnectors.register("cgSociety", service);

    return service;

    ///////////

    function fetch(offset, size) {
      var deferred = $q.defer();

      var page = offset / size + 1;

      data.get({
        page: page,
        size: size
      }, function(feeds) {
        var result = feeds.items.map(function(item) {
          return {
            title: item.title,
            image: item['image-url'],
            likes: item['like-count'],
            url: item.url
          };
        });

        deferred.resolve(result);
      });

      return deferred.promise;
    }
  }
})();
