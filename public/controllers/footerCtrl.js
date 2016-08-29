myApp.controller('footerCtrl', function($scope, $http, $window, $location){



   $scope.open = function () {

      $.toaster(
         {
            title : 'Bonjour ' ,
            message : ' On ne se connait pas encore ?',
            priority : 'info',
            settings : {
               'toast'       :
               {
                  'template' :
                  '<div class="alert alert-%priority% alert-dismissible" role="alert">' +
                     '<button type="button" class="close" data-dismiss="alert">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '<span class="sr-only">Close</span>' +
                     '</button>' +
                     '<div class="row">'+
                     '<br>'+
                        '<div class="col-md-8 col-md-offset-2 clearfix">'+
                           '<img class="img-responsive img-circle center-block" src="../img/preview.jpg">'+
                        '</div>'+
                     '</div>'+
                     '<br>'+
                     '<div class="text-center"><span class="title"></span>%delimiter% <span class="message"></span></div>' +
                     '<br>'+
                     '<br>'+
                     '<a class="btn btn-sm btn-primary btn-lg btn-block" href="#/ldap_login"> Je me presente </a>'+
                  '</div>'
               }
            }

         }
      );
   };


});