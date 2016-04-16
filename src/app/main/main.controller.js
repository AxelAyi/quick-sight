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
    vm.currentFeed = 'sketchFab';

    var offset = 0,
      pageSize = 24,
      loading = false;

    loadMore();

    ///////////

    function onFeedsFetched(feeds) {
      vm.thumbnails = vm.thumbnails.concat(feeds);
      offset += pageSize;
      loading = false;
    }

    function loadMore() {
      if (!loading && offset < feedConnectors.get(vm.currentFeed).count) {
        feedConnectors.get(vm.currentFeed).fetch(offset, pageSize).then(onFeedsFetched);
        loading = true;
      }
    }
  }
})();
