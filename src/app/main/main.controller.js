(function() {
  'use strict';

  angular
    .module('quickSight')
    .controller('MainController', MainController);

  MainController.$inject = ['$timeout', 'webDevTec', 'toastr', 'cgSociety', '$log'];

  function MainController($timeout, webDevTec, toastr, cgSociety, $log) {
    cgSociety.getFeeds().then(function(cgFeeds) {
      $log(cgFeeds);
    });
    var vm = this;

    vm.cards = [];
    for (var i = 0; i < 10; i++) {
      vm.cards.push({
        "id": i
      });
    }

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1459463908589;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
