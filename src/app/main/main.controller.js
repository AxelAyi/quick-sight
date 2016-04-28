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
    vm.currentFeed = 'Art Station';

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
        var currentFeedConnector = feedConnectors.get(vm.currentFeed);
      if (currentFeedConnector && !loading && offset < currentFeedConnector.count) {
        currentFeedConnector.fetch(offset, pageSize).then(onFeedsFetched);
        loading = true;
      }
    }
  }
})();
