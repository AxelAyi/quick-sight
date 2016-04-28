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
    vm.currentFeed = 'Kickstarter';
    vm.currentFeedConnector = feedConnectors.get(vm.currentFeed);

    var offset = 0,
      pageSize = 24,
      loading = false;

    loadMore();

    ///////////


    function onFeedsFetched(feeds) {
      vm.thumbnails = vm.thumbnails.concat(feeds);
      offset += feeds.length;
      loading = false;
    }

    function loadMore() {
      if (vm.currentFeedConnector && !loading && offset < vm.currentFeedConnector.count) {
        vm.currentFeedConnector.fetch(offset, pageSize).then(onFeedsFetched);
        loading = true;
      } else if (!vm.currentFeedConnector) {
        console.error("Unknown Feed '" + vm.currentFeed + "'");
      }
    }
  }
})();
