(function() {
  'use strict';

  angular
    .module('quickSight')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
