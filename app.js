'use strict';

// Declare app level module which depends on views, and components
var CampusEnvironment = angular.module('CampusEnvironment', [
 'ngRoute','LocationsDataControllerModule', 'LocationsDataServiceModule', 'ParkingDataServiceModule', 'ParkingDataControllerModule', 'RandomDataServiceModule','RandomDataControllerModule',
 
]);
/*config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);*/

//establishing Different Views

CampusEnvironment.config(['$routeProvider', 
    function($routeProvider){
        $routeProvider.
                 //when('/locations',{
                 when('/',{   //Extention for home page
                templateUrl: 'view1/enter.html', //path for home page data
                //controller: 'LocationsDataController',
                //css:'homeCSS.css'
                 
            }).
                    when('/menu',{//extention for menu 
                        templateUrl: 'view2/menu.html',
                        controller:'LocationsDataController'
                        
            }).
                    when('/map',{//extention for map page 
                        templateUrl: 'view3/map.html',
                        controller: 'LocationsMapTest2Controller'
                        //css:'maps.css'
                        
            }).
                     when('/parking',{//extention for map page 
                        templateUrl: 'view4/parking.html',
                        controller: 'ParkingMapController'
                        //css:'maps.css'
                        
            }).
                     when('/pickLocation',{//extention for map page 
                        templateUrl: 'view3/pickLocation.html',
                        controller: 'DropDownDataController'
                        //css:'maps.css'
                        
            }).
                     when('/locationResult',{//extention for map page 
                        templateUrl: 'view3/locationResult.html',
                        controller: 'LocationResultController'
                        //css:'maps.css'
                        
            }).
                     when('/garageDisplay',{//extention for map page 
                        templateUrl: 'view4/garageDisplay.html',
                        controller: 'RandomMapController'
                        //css:'maps.css
                        
            }).
                    when('/residentParking',{//extention for map page 
                        templateUrl: 'view4/residentParking.html',
                        controller: 'ResidentMapController'
                        //css:'maps.css'
                        
            }).
                     when('/commuterParking',{//extention for map page 
                        templateUrl: 'view4/residentParking.html',
                        controller: 'CommuterMapController'
                        //css:'maps.css'
                        
            }).
                    when('/visitorParking',{//extention for map page 
                        templateUrl: 'view4/residentParking.html',
                        controller: 'VisitorMapController'
                        //css:'maps.css'
                        
            }).
                    when('/facultyParking',{//extention for map page 
                        templateUrl: 'view4/residentParking.html',
                        controller: 'FacultyMapController'
                        //css:'maps.css'
                        
            }).
                    
                    
                     when('/parkingMenu',{//extention for map page 
                        templateUrl: 'view4/parkingMenu.html'
                        //controller: 'CommuterMapController',
                        //css:'maps.css'
                        
            }).
                    when('/howto',{//extention for map page 
                        templateUrl: 'view1/howto.html'
                        //controller: 'CommuterMapController',
                        //css:'maps.css'
                        
            }).
                    when('/aboutus',{//extention for map page 
                        templateUrl: 'view1/aboutus.html'
                        //controller: 'CommuterMapController',
                        //css:'maps.css'
                        
            }).
                    when('/disclaimer',{//extention for map page 
                        templateUrl: 'view1/disclaimer.html'
                        //controller: 'CommuterMapController',
                        //css:'maps.css'
                        
            }).
                    
             
               
                    
          otherwise({ //jump to enter/splash page if cannot load required page
            //redirectTo: '/locations'        
            redirectTo: '/'
        });
    }]);