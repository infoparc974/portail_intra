myApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: '../views/liens_utiles.html',
    controller: 'AppCtrl'
  })
  .when('/liens_utiles', {
    templateUrl: '../views/liens_utiles.html',
    controller: 'AppCtrl'
  })
  .when('/volcan', {
    templateUrl: '../views/volcan.html',
    controller: 'VolcanCtrl'
  })
  .when('/admin', {
    // resolve: {
    //   "check": function($location, $rootScope){
    //     if (!$rootScope.loggedIn) {
    //       $location.path('/login')
    //     }
    //   }
    // },
    templateUrl: '../views/admin.html',
    controller: 'AppCtrl'
  })
  .when('/annuaire', {
    templateUrl: '../views/annuaire.html',
    controller: 'AnnuaireCtrl'
  })
  .when('/manuel', {
    templateUrl: '../views/manuel.html',
    controller: 'AnnuaireCtrl'
  })  
  .when('/login', {
    templateUrl: '../views/login.html',
    controller: 'loginCtrl'
  })  
  .when('/ldap_login', {
    templateUrl: '../views/ldap_login.html',
    controller: 'LdapLoginCtrl'
  })
  .when('/mon_compte', {
    templateUrl: '../views/mon_compte.html',
    controller: 'MyAccountCtrl'
  })  
  .when('/telechargements', {
    templateUrl: '../views/telechargements.html',
    controller: 'AppCtrl'
  })
  .otherwise({
    redirectTo : '/liens_utiles'
  });


});
