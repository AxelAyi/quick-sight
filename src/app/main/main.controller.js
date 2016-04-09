(function() {
  'use strict';

  angular
    .module('quickSight')
    .controller('MainController', MainController);

  MainController.$inject = ['$timeout', 'webDevTec', 'toastr', '$log', 'feedConnectors'];

  function MainController($timeout, webDevTec, toastr, $log, feedConnectors) {

    var vm = this;
    vm.thumbnails = [];
    vm.loadMore = loadMore;

    var offset = 0,
      pageSize = 20;

    loadMore();

    ///////////

    function onFeedsFetched(feeds) {
      vm.thumbnails = vm.thumbnails.concat(feeds);
      offset += pageSize;
    }

    function loadMore() {
      if (offset < feedConnectors.mockFeed.count) {
        feedConnectors.mockFeed.fetch(offset, pageSize).then(onFeedsFetched);
      }
    }
  }
})();
