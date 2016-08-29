var myApp = angular.module('myApp', ['ngRoute', 'ngCookies','angularFileUpload']);


myApp.controller('navCtrl', function($rootScope, $scope, $http, $window, $location, $cookies){

   $scope.planning = function () {

      $scope.date = moment().format("M/YYYY");

      $http.get('/monIP')

      .success(function(response) {

         console.log(response);

         plage_ip = JSON.stringify(["10","9","74"]);

         network_address = JSON.stringify(response.split(".", 3));

         if (network_address == plage_ip) {

            $window.open('http://parc-websandbox/jorani/calendar/tabular/0/'+ $scope.date +'/true');

         } else {

            exeption_1 = "172.16.31.10";
            exeption_2 = "172.16.31.25";

            if (response == exeption_1 || response == exeption_2) {
               $window.open('http://parc-websandbox/jorani/calendar/tabular/0/'+ $scope.date +'/true');
            } else{
               alert("Vous n'etes pas autorisé à accéder à cette page");
            };


         };
      })

      .error(function(data){
         console.log("Erreur détéctée : " + data);
         $location.path("#/");
      });


   };


   $rootScope.currentUserName = $cookies.get("currentUserName");

   if (!$rootScope.currentUserName) {

      $rootScope.isLogged = false;

   }else{

      $rootScope.isLogged = true;

   };


   $scope.logout = function(){
      $cookies.remove("currentUserName");
      $rootScope.currentUserName = "";
      $scope.isLogged = false;
      $location.path('#/');

   }


});

