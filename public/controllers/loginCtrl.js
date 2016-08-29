myApp.controller('loginCtrl', function($scope, $rootScope, $http, $location){

   $scope.submit = function () {

      if ($scope.username == "admin" && $scope.password == "Parc974$") {
         $rootScope.loggedIn = true;
         $location.path("/admin")
      } else {
         alert("Mot de passe incorrecte !")
      };

   };

   

});
