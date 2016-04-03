(function() {
  'use strict';

  angular
  .module('quickSight')
  .controller('MainController', MainController);

  MainController.$inject = ['$timeout', 'webDevTec', 'toastr', '$log', 'feedConnectors'];

  function MainController($timeout, webDevTec, toastr, $log, feedConnectors) {

    var vm = this;
    vm.thumbnails = [];

    // feedConnectors.cgSociety.fetch().then(function(feeds) {
    //   $log.log(feeds);
    // });

    feedConnectors.mockFeed.fetch(0, 10).then(onMockFetched);

    function onMockFetched(feeds) {
        vm.thumbnails = feeds;
        $log.log(feeds);
    }
  }
})();
