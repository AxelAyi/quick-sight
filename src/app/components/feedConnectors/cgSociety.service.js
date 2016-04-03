(function() {
  'use strict';

  angular
    .module('quickSight')
    .factory('cgSociety', cgSociety);

  cgSociety.$inject = ['$resource', '$q', '$log'];

  function cgSociety($resource, $q, $log) {
    var data = $resource('http://www.cgsociety.org/ajax/gallery_json.php?page=:page&per=:size', {});
    var service = {
      getFeeds: getFeeds
    };
    return service;

    ///////////

    function getFeeds(page, size) {
      var deferred = $q.defer();

      data.get({
        page: page,
        size: size
      }, function(feeds) {
        $log(feeds);
      });

      return deferred.promise;
    }
  }
})();
