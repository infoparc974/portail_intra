myApp.controller('AppCtrl', function($scope, $http) {
  console.log("Hello World from controller");

  

      // Partie Applie

      var refresh = function() {
        $http.get('/item').success(function(response) {
          $scope.item_list = response;
          $scope.item = "";
        });
      };

      refresh();

      $scope.addItem = function() {
        $http.post('/item', $scope.item).success(function(response) {
          console.log(response);
          refresh();
          $.toaster({ priority : 'success', title : 'Bravo ', message : "Application ajoutee !", settings : {'timeout': 5000}});

        });
      };

      $scope.remove = function(id) {
        if(confirm(" *** Confirmer la suppression ? ***") == true)
          console.log(id);
        $http.delete('/item/' + id).success(function(response) {
          refresh();
          $.toaster({ priority : 'danger', title : 'Bravo ', message : "Application supprimee !", settings : {'timeout': 5000}});
        });
      };

      $scope.edit = function(id) {
        console.log(id);
        $http.get('/item/' + id).success(function(response) {
          $scope.item = response;
        });
      };  

      $scope.update = function() {
        console.log($scope.item._id);
        $http.put('/item/' + $scope.item._id, $scope.item).success(function(response) {
          refresh();
        })
      };

      $scope.deselect = function() {
        $scope.item = "";
      };

      $scope.test=true;

  // partie annuaire

  var refresh_annuaire = function() {

    $http.get('/contact').success(function(response) {
      $scope.contact_list = response;
      $scope.contact = "";

    });

  };

  refresh_annuaire();

  $scope.addContact = function() {
    console.log($scope.contact);
    $http.post('/contact', $scope.contact).success(function(response) {
      console.log(response);
      refresh_annuaire();
    });
  };

  $scope.removeContact = function(id) {
    console.log(id);
    $http.delete('/contact/' + id).success(function(response) {
      refresh_annuaire();
    });
  };

  $scope.editContact = function(id) {
    console.log(id);
    $http.get('/contact/' + id).success(function(response) {
      $scope.contact = response;
    });
  };  

  $scope.updateContact = function() {
    console.log($scope.contact._id);
    $http.put('/contact/' + $scope.contact._id, $scope.contact).success(function(response) {
      refresh_annuaire();
    })
  };

  $scope.deselectContact = function() {
    $scope.contact = "";
  };

  // partie utilisateurs

  var refresh_user = function() {

    $http.get('/user').success(function(response) {
      $scope.user_list = response;
      $scope.user = "";

    });

  };

  refresh_user();

  $scope.addUser = function() {
    $http.post('/user', $scope.user).success(function(response) {
      console.log(response);
      refresh_user();
    });
  };

  $scope.removeUser = function(id) {
    console.log(id);
    $http.delete('/user/' + id).success(function(response) {
      refresh_user();
    });
  };

  $scope.editUser = function(id) {
    console.log(id);
    $http.get('/user/' + id).success(function(response) {
      $scope.user = response;
    });
  };  

  $scope.updateUser = function() {
    console.log($scope.user._id);
    $http.put('/user/' + $scope.user._id, $scope.user).success(function(response) {
      refresh_user();
    })
  };

  $scope.deselectUser = function() {
    $scope.user = "";
  };

  // partie docs

  var refresh_docs = function() {

    $http.get('/docs').success(function(response) {
      $scope.doc_list = response;
      $scope.doc = "";

    });

  };

  refresh_docs();

  $scope.addDoc = function() {
    $http.post('/doc', $scope.doc).success(function(response) {
      console.log(response);
      refresh_docs();
    });
  };

  $scope.removeDoc = function(id) {
    console.log(id);
    $http.delete('/doc/' + id).success(function(response) {
      refresh_doc();
    });
  };

  $scope.editDoc = function(id) {
    console.log(id);
    $http.get('/doc/' + id).success(function(response) {
      $scope.doc = response;
    });
  };  

  $scope.updateDoc = function() {
    console.log($scope.doc._id);
    $http.put('/doc/' + $scope.doc._id, $scope.doc).success(function(response) {
      refresh_docs();
    })
  };

  $scope.deselectDoc = function() {
    $scope.doc = "";
  };


});﻿