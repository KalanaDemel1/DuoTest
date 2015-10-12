//var maps = require('functions/functions');
(function(angular) {
  'use strict';
var myApp = angular.module('RideApp',['ngRoute']);
//var myApps = angular.module('RideApp',['ngRoute']);

//var directives = angular.module('directives');
myApp.config(function($routeProvider, $locationProvider, $httpProvider)
{

     var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
        
          $location.url('/login');
        }
      });

      return deferred.promise;
    };


      $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });


  $routeProvider

  .when('/book',{

    templateUrl:'views/home.html',
    controller:'bookController'
  })

  .when('/midhome',{

    templateUrl:'views/midhome.html',
    controller:'midController',
    
  })

  .when('/login',{
    templateUrl:'login.html',
    controller:'loginController'
    
  })

  .when('/report',{
    templateUrl:'reports.html',
    controller:'reportController'
    
  })
  .when('/',{
    templateUrl:'views/main.html',
    controller:'mainController'
    
  })

  

  .when('/taxi',{
    templateUrl:'views/taxi.html',
    controller:'taxiController'
    
  })

  .when('/map',{
    templateUrl:'views/map.html',
    controller:'mapController'
    
  })

  .when('/driver',{
    templateUrl:'views/driver.html',
    controller:'driverController'
    
  })






})

 .run(function($rootScope, $http){
    $rootScope.message = '';

    // Logout function is available in any pages
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/logout');
    };
  });

myApp.controller('bookController',['$scope','$location','$log','$http',function($scope,$location,$log,$http){


}]);

myApp.controller('taxiController',function($scope,$http){
    

    $scope.search=function search(vehicle){
      
      var rgtrno=vehicle.rgtrno;
      $http.get("/showtaxi/"+vehicle.rgtrno).success(function(response){
      $scope.detail=response;
    
      
    
      });

    }

    $scope.add=function add(addtaxi){
      
      
      $http.post("/addtaxis",addtaxi).success(function(response){
      $scope.respadd=response;
      
    
      });

    }

    $scope.removetaxis=function removetaxis(detail){
      
      
      $http.delete("/deletetaxis/"+detail.respond[0]._id).success(function(response){
      $scope.detail=response;
      document.getElementById('detail').style.visibility = "visible";

      
    
      });

    }



});

myApp.controller('driverController',function($scope,$http){
    

    $scope.searchdriver=function searchdriver(driver){
      
      
      $http.get("/showdriver/"+driver.rgtrno).success(function(response){
      $scope.details=response;

    
      
    
      });

    }

    $scope.adddrivers=function adddrivers(adddriver){
      
    
      $http.post("/adddrivers",adddriver).success(function(response){
      $scope.respdriver=response;
      
    
      });

    }

    $scope.removedrivers=function removedrivers(details){
      
      
      $http.delete("/deletedriver/"+details.respond[0]._id).success(function(response){
      $scope.details=response;
      document.getElementById('details').style.visibility = "visible";
    
      
    
      });

    }





});
myApp.controller('loginController',function($scope,$http,$location,$rootScope){
    
      $scope.user = {};
      $scope.logins=function logins(user){
          var username=$scope.user.username;
          var password=$scope.user.password;
          
          $http.post("/authent",{username:username,password:password}).success(function(response){
            
             $rootScope.message = 'Authentication successful!';
             $scope.res=response;
             $location.url('/midhome');
      
    
          })
         .error(function(){
      
          $scope.message = 'Invalid User.';
           $location.path('/login');
        });

      }


});


myApp.controller('midController', function($scope, $http) {
                
                $http.get('/orders')
                .success(function(data) {
                        $scope.orders = data;

                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
   
});
myApp.controller('ThirdController',['$scope','$location','$log',function($scope,$location,$log){


}]);

myApp.controller('ThirdController',['$scope','$location','$log',function($scope,$location,$log){


}]);



})(window.angular);



