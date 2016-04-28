(function() {
  'use strict';

  angular
    .module('quickSight')
    .run(kickstarter);

  kickstarter.$inject = ['feedConnectors', '$resource', '$q', '$log'];

  function kickstarter(feedConnectors, $resource, $q, $log) {
    var url = "https://www.kickstarter.com/discover/advanced?google_chrome_workaround&category_id=16&woe_id=0&sort=magic&seed=2435178&page=:page";
    var options = {
      get: {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      }
    };
    var data = $resource(url, {}, options);
    var service = {
      fetch: fetch,
      count: 300,
      showDescription: true
    };

    feedConnectors.register("Kickstarter", service);

    return service;

    ///////////

    function fetch(offset, size) {
      var deferred = $q.defer();

      var page = offset / size + 1;

      data.get({
        page: page,
        size: size
      }, function(feeds) {
        var result = feeds.projects.map(function(item) {
          return {
            title: item.name,
            image: item.photo.full,
            url: item.url,
            desc: item.pledged + item.currency_symbol + " / " + item.goal + item.currency_symbol
          };
        });

        deferred.resolve(result);
      });

      return deferred.promise;
    }
  }
})();
