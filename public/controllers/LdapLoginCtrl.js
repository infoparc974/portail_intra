myApp.controller('LdapLoginCtrl', function($rootScope, $http, $scope, $location, $cookies){


   $scope.login = function (user) {

      $http.post('/login', user).success(function(response) {
         $scope.user.passwd = "";

         switch (response){
            case "wrong_password" : $.toaster({ priority : 'danger', title : 'Erreur ', message : "Mot de passe incorrect...", settings : {'timeout': 5000}});
            break;
            case "unknow_user" : $.toaster({ priority : 'danger', title : 'Erreur ', message : "Nom d'utilisateur incorrect...", settings : {'timeout': 5000}});
            break;
            default :
            $.toaster({ priority : 'success', title : 'Bravo ', message : "Connexion réussie !", settings : {'timeout': 5000}});
            
            // Expiration du cookie dans 30 jours

            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 30);

            $cookies.put("currentUserName", response.name, {'expires': expireDate});
            $rootScope.isLogged = true;
            $rootScope.currentUserName = response.name;
            $location.path('#/');
            break;
         }         
      });
   };


});
