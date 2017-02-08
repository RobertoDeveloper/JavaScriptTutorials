(function() {
    'use strict';

    angular
      .module('app')
      .factory('RetryRequestFactory', RetryRequestFactory);

    RetryRequestFactory.$inject = ['$timeout'];

    function RetryRequestFactory($timeout) {

      var self = this;
      self.retryCount = 3;

      return {
        Go : Go
      };

      function Go(run, callback) {
        retryFunction(run, callback);
      }

      function retryFunction(run, callback) {
        var promise = run();

        promise.then(function(data) {
            callback(null, data);
        }).catch(function(err) {
           if(self.retryCount > 0) {
              console.log('Wait for 2 seconds ' + new Date());
              $timeout(function() {
                  console.log('Fired after 2 seconds ' + new Date());
                  self.retryCount -= 1;
                  retryFunction(run, callback);
              }, 2000);

           }else {
             self.retryCount = 3;
             callback(err);
           }
        });
      }
    }
})();
