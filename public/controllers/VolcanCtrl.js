myApp.controller('VolcanCtrl', function($rootScope, $scope, $window){

   $scope.goto = function(){
      $window.open('http://volcan.smprr.re/evenements/view/'+ $scope.n_demande);
   }

   $scope.toggle = function(){
      $rootScope.isLogged = !$rootScope.isLogged;
   }

});
