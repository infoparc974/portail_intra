myApp.controller('AnnuaireCtrl', ['$scope', '$http', function($scope, $http){


 $scope.mafonction = function(serv) {

      console.log(serv);

    $http.get('/contact').success(function(response) {
      console.log("I got the data I requested");
      $scope.contact_list = response;
      $scope.contact = "";

      $scope.myTab = $scope.contact_list;
      $scope.myNewTab = [];

      for (var i = 0; i < $scope.myTab.length; i++) {
        if ($scope.myTab[i].service==serv) {
          $scope.myNewTab.push($scope.myTab[i]);
        };
      };

    });

  };

}]);
