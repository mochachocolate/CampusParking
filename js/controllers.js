/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//****************************Controllers property of mourique Hunter ********************************************





//------------------------------------------------------------------
var locationsDataControllerModule = angular.module('LocationsDataControllerModule',[]);


 //------------------------
 // link to personal database for information on locations, grabs info to beused in functionality
 locationsDataControllerModule.controller('LocationsDataController', function ($scope,LocationsDataService){
       //(just made thsi edit, thing lactaionDataService is only needed)$scope.query;
      // $scope.location=[{lat:0,lng:0}];
       
      // $scope.location[0].lat = -131.99;
       // $scope.location[0].lng = 132.99;
       
      LocationsDataService.query().$promise.then(function(data){ //grabs from data service
          $scope.location = data;
         //console.log($scope.location[0].lat);
     });
   
     
 });



//----------DROPDOWN MENU CONTROLLER-------------------------------------------------

locationsDataControllerModule.controller('DropDownDataController', function ($log,$scope,$window,LocationsDataService, LocationChoice){
    
    
     LocationsDataService.query().$promise.then(function(data){
         
        
     $scope.location = data;
    
     //var obj = JSON.parse(text);
     //var JSONbig = require('json-bigint');
    // var inputval = []; 
    // var inputvalj = JSON.parse(inputval);
     var input = [];
    var option = []; 
     var dataPush = [];
      var saveData = []; 
      var result = [];
      var temp = []; 
     // var saveData = new array(); 
      dataPush = document.getElementById("list");
      //dataPush = document.createElement("list");
    
     
     
     //populate drop down menu 
     for(var i = 0; i < data.length; i++){
        
        saveData[i] = data[i]; 
       var dataElement = document.createElement("option");
        //var dataElement = [];
        dataElement.text = saveData[i].name;
       // dataElement.value = JSON.stringify(saveData[i]);
       dataElement.value = saveData[i].lat;
        dataElement.string = saveData[i].lng; 
       // dataElement.value = saveData[i].lat, saveData[i].lng;
        dataPush.appendChild(dataElement);
        //button to run calltoAssToProductList  
        //save selected choice 
         temp = document.getElementById("myOpt");
       // var temp = document.querySelector("#myOpt");
        //identifies click of choice
        temp.addEventListener("click", callToAddToProductList);
        
        
         

     
         
     }
     $scope.dataList = dataElement; 
     
       
    function myFunction() {
    document.getElementById("demo").innerHTML += "Moused over!<br>";
}
     
    //$scope.userpick = function(input){
   


//===========================================================================
       
        //$scope.callToAddToProductList = function(inputval){
function callToAddToProductList(){
            
              input = document.getElementById("list");
             // input = dataElement;
  /*
    for (var i = 0; i < input.length; i++)
{
         //input[i] = document.getElementById("list");
	alert(input.options[i].text);
        
}
*/
     var inputval = input.options[input.selectedIndex].value;
    var inputtxt = input.options[input.selectedIndex].text;
    var inputstr = input.options[input.selectedIndex].string;
   
     
  //alert("txt :" + inputtxt + " val :" + inputval + " str: " + inputstr);
    
                      
                      
                
             
            LocationChoice.addLat(inputval);
            LocationChoice.addLng(inputstr);
            LocationChoice.addName(inputtxt);
            
        
            
            //$filter('json')(inputval);
           // $log.debug(angular.toJson(data, true));
            console.log(JSON.stringify(inputtxt));
    };       
     
     //optional link to result page
      document.getElementById("myButton").onclick = function () {
        location.href = "#/locationResult/";
    };
     
     
     
    
   
     
     
 });
    /*LocationChoice.query().$promise.then(function(data1){
        
    });*/
    
    
    });
    
//**********LocationResult*********************************************************************************************    

locationsDataControllerModule.controller('LocationResultController', function ($window,$scope,LocationsDataService, LocationChoice){
    
    
     //function my_method(){
     //LocationChoice.getLocation().$promise.then(function(data){
    //var data = []; 
    
      //$scope.result = LocationChoice.getLocation();
    // data = LocationChoice.getLocation();
    LocationsDataService.query().$promise.then(function(data){
     var resultLat;
     var resultLng;
     var resultName; 
     var gmarkers = [];
     var tempdata = []; 
     //$scope.resultdata = LocationChoice.getLocation();
     resultLat = LocationChoice.getLat();
     resultLng = LocationChoice.getLng(); 
     resultName = LocationChoice.getName();
     $scope.resultLat = resultLat; 
     $scope.resultLng = resultLng;
     $scope.resultName = resultName; 
     var myLatLng = new google.maps.LatLng(data[0].lat, data[0].lng);
     
     $window.map = new google.maps.Map(document.getElementById('map'), {
        /*center: {
            lat: -34.397,
            lng: 150.644
        },*/
        center: myLatLng,
        zoom: 16
    });
    
    //Current location ========================================
    
 
         //-----------TEST wath --------------------
     
     var marker = null;
        function autoUpdate() {
             
  navigator.geolocation.getCurrentPosition(function(position) {  
    var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                          position.coords.longitude);

    if (marker) {
      // Marker already created - Move it
      marker.setPosition(newPoint);
    }
    else {
      // Marker does not exist - Create it
      marker = new google.maps.Marker({
        position: newPoint,
        map: map,
        icon: "img/circle-icon.png"
      });
    }

    // Center the map on the new position
    function liveCenter(){
    map.setCenter(newPoint);
}
    function deleteMarkers(){
        clearMarkers();
        markers = [];
    }
    deleteMarkers();
//liveCenter(); 
  }); 

  // Call the autoUpdate() function every 5 seconds
  setTimeout(autoUpdate, 5000);
}

autoUpdate();
  
 
     
     //getLocationUpdate(); 
    
    
    
    //=============================
    //=====map campus center button function----
    
     function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Go To Campus';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(myLatLng);
  });

}



    
    
    //==================================
     var infowindow = new google.maps.InfoWindow(
  { 
     // content: data[1].name,
    size: new google.maps.Size(150,50)
  });
    
 // ----function call map center button for campus
 
 var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
 
 
 //============================================================
    
    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
        });
    
    for(var i = 0; i < resultName.length; i++){
    
    var point = new google.maps.LatLng(resultLat[i], resultLng[i]);
       //set data to marker 
         createMarker(point, resultName[i], "text to be displayed");
    
    $window.myclick = function(i){
    google.maps.event.trigger(gmarkers(i), "click");
    console.log('i am defined and available');
}
     
function createMarker(latlng, name, html) {
    var contentString = name;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
 
 

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
       
        });
        // call get current location here so location pops up with
       //selected index location result
         //getLocationUpdate(); 
        gmarkers.push(marker);
       
       
        
        
}   
         
    }    
    
     });
     
     
     
     //}
});

//************TEST MAP 2*************************************************************************************


//var locationsDataTestControllerModule = angular.module('LocationsDataTestControllerModule',['uiGmapgoogle-maps']);

locationsDataControllerModule.controller('LocationsMapTest2Controller', function ($scope,$window,$routeParams,LocationsDataService){
     
   /*  <!--------------------------------------------------->*/
  
   
    
      
    
      LocationsDataService.query().$promise.then(function(data){
     $scope.location = data;
 // });
      $scope.query;
    /*=======================================================================*/
    
    //var myLatLng = new google.maps.LatLng(38.898748, -77.037684);
   
     var myLatLng = new google.maps.LatLng(data[0].lat, data[0].lng);
    

   var gmarkers=[];
   var i;  
  // var map;
   // this variable will collect the html which will eventually be placed in the side_bar 
      var side_bar_html = ""; 
 
 //-------- center button on map --------
 
 function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Go To Campus';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(myLatLng);
  });

}
 
 
 
   
 //----end---------------------------------  
   
   function center(){
    $window.map = new google.maps.Map(document.getElementById('map'), {
        /*center: {
            lat: -34.397,
            lng: 150.644
        },*/
        center: myLatLng,
        zoom: 16.
        
        
    });
    
   }
   
   center();
     //-----------TEST wath --------------------
     
      var marker = null;
        function autoUpdate() {
            
  navigator.geolocation.getCurrentPosition(function(position) {  
    var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                          position.coords.longitude);

    if (marker) {
      // Marker already created - Move it
      marker.setPosition(newPoint);
    }
    else {
      // Marker does not exist - Create it
      marker = new google.maps.Marker({
        position: newPoint,
        map: map,
        icon: "img/circle-icon.png"
      });
    }

    // Center the map on the new position
    function liveCenter(){
    map.setCenter(newPoint);
}
    function deleteMarkers(){
        clearMarkers();
        markers = [];
    }
    deleteMarkers();
//liveCenter(); 
  }); 

  // Call the autoUpdate() function every 5 seconds
  setTimeout(autoUpdate, 5000);
}

autoUpdate();
 //---current position map button---
 
 
 
 function myCenterControl(controlDiv1, map) {

  // Set CSS for the control border.
  var controlUI1 = document.createElement('div01');
  controlUI1.style.backgroundColor = '#fff';
  controlUI1.style.border = '2px solid #fff';
  controlUI1.style.borderRadius = '3px';
  controlUI1.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI1.style.cursor = 'pointer';
  controlUI1.style.marginBottom = '22px';
  controlUI1.style.textAlign = 'center';
  controlUI1.title = 'Click to finde your location';
  controlDiv1.appendChild(controlUI1);

  // Set CSS for the control interior.
  var controlText1 = document.createElement('div01');
  controlText1.style.color = 'rgb(25,25,25)';
  controlText1.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText1.style.fontSize = '16px';
  controlText1.style.lineHeight = '38px';
  controlText1.style.paddingLeft = '5px';
  controlText1.style.paddingRight = '5px';
  controlText1.innerHTML = 'My Location';
  controlUI1.appendChild(controlText1);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI1.addEventListener('click', function() {
    map.setCenter(liveCenter());
  });

}
 //---
 
  /*var mycenterControlDiv = document.createElement('div01');
  var centerControl = new CenterControl(mycenterControlDiv, map);

  mycenterControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(mycenterControlDiv);*/
 
 
 //--------------------------
     
      
     
     
   /* function showLocation(position) {
            //var latitude = position.coords.latitude;
            //var longitude = position.coords.longitude;
           // alert("Latitude : " + latitude + " Longitude: " + longitude);
           
           var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
//var greendot = 
        var marker = new google.maps.Marker({
            position: pos,
            map: $window.map,
            icon: "img/circle-icon.png"
            //title: 'Hello World!'
          });

          //  infoWindow.setPosition(pos);
         //   infoWindow.setContent('Location found.');
            $window.map.setCenter(pos);
         }
    
    
       function getLocationUpdate(){
           // if(navigator.geolocation){
               // timeout at 60000 milliseconds (60 seconds)
               //var options = {timeout:60000};
               geoLoc = navigator.geolocation;
               watchID = geoLoc.watchPosition(showLocation);
            //}
        }
     
       function stopWatch(){
            geoLoc.clearWatch(watchID);
         }
     
     getLocationUpdate(); */
     //current location===========================================
   /*  function myPosition(){    
         //navigator.geolocation.getCurrentPosition(function(position) {
         navigator.geolocation.watchPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
//var greendot = 
var marker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: "img/circle-icon.png"
    //title: 'Hello World!'
  });

          //  infoWindow.setPosition(pos);
         //   infoWindow.setContent('Location found.');
            map.setCenter(pos);
          });   
    
    
     }
   myPosition();*/
    //--------end test--------------------------
    
    function endTrack(){
        
        
        
        
    }
       
    
    
   //-----ceter button map button-------------
   var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
   
   //-------------------------
     /*var point = new google.maps.LatLng(data[i].lat, data[i].lng);
     var marker = createMarker(point, data.name, "Text to be displayed")*/
     
     var infowindow = new google.maps.InfoWindow(
  { 
     // content: data[1].name,
    size: new google.maps.Size(150,50)
  });
  // This function picks up the click and opens the corresponding info window and closes another open one
google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
        });
    
        // A function to create the marker and set up the event window function 
        for(i=0; i < data.length; i++){
            
       var point = new google.maps.LatLng(data[i].lat, data[i].lng);
       //set data to marker 
         createMarker(point, data[i].name, "text to be displayed");
      // put the assembled side_bar_html contents into the side_bar div
        // document.getElementById("side_bar").innerHTML = side_bar_html;  


  // put infp from side_bar_html into sidebar div on html page
     document.getElementById("side_bar").innerHTML = side_bar_html; 

$window.myclick = function(i){
    google.maps.event.trigger(gmarkers[i], "click");
    console.log('i am defined and available');
}
     
function createMarker(latlng, name, html) {
    var contentString = name;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
 
 

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
       
        });
        
        // save the info we need to use later for the side_bar
//when click side option stores where that marker pertaining to the data is 
//when click sidebar show location on map 
        //gmarkers.push(marker);
        
     
        
    
    // add a line to the side_bar html
    side_bar_html += '<a href="javascript:myclick(' + (gmarkers.length-1) + ')">' + name + '<\/a><br>';
    //side_bar_html += gmarkers.length + name + '<\/a><br>';
    
    //return marker;
  
   
}
 

        }
     
     
    
    });//end for locationdataservice promise
 });




//============================================================================


//----------------------------------------------------------------------------


var parkingDataControllerModule = angular.module('ParkingDataControllerModule',[]);


parkingDataControllerModule.controller('ParkingMapController', function ($scope,$window,$routeParams,ParkingDataService){


  
  

    
    ParkingDataService.query().$promise.then(function(data){











        
        $scope.location = data; 
        
        
         var myLatLng = new google.maps.LatLng(26.370505, -80.102508);
    

    var random = Math.floor((Math.random()*100) + 1);
    var random2 = Math.floor((Math.random()*100) + 1);
    var random3 = Math.floor((Math.random()*100) + 1);

   var i;  
   //var parkingLocation = new google.maps.LatLng(data[i].lat, data[i].lng);
   var parkingData = data;
   var temp = [0,1,2,3,4,5];
   var gmarker = [];
   var counter = [];
  
   //var line = new ProgressBar.Line('#container');
  // var map;
   // this variable will collect the html which will eventually be placed in the side_bar 
     // var content = '<p>location[1].lng</p><br/>'+parkingData[i].name; 

   //var map = null;
   
   //map center to campus-------------------------
   
   
   
    function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Go To Campus';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(myLatLng);
  });

}

   
   
   
   
   
   
   
   
   
   //==============================================
   function center(){
    $window.map = new google.maps.Map(document.getElementById('map'), {
        /*center: {
            lat: -34.397,
            lng: 150.644
        },*/
        center: myLatLng,
        zoom: 16
    });
   }
   
   center(); 
   
   
   
   //=======call campus center===================
   
   
   
   var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
   
   
   
   
   
    //--------TEST(current location)-----------------------
     //var infoWindow = new google.maps.InfoWindow({map: map});

          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

var marker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: "img/circle-icon.png"
    //title: 'Hello World!'
  });

          //  infoWindow.setPosition(pos);
         //   infoWindow.setContent('Location found.');
           // map.setCenter(pos);
          });
      

      
    
    //-----------end of test----------------------------
    
  //===progress bar function=====================
  //========progress bar ========================
     
     $(document).ready(function() {
         
    var progression = 0,
    progress = setInterval(function() 
    {
        $('#progress01 .progress-text').text(progression + '%');
        $('#progress01 .progress-bar').css({'width':progression+'%'});
        if(progression == 100) {
            clearInterval(progress);
            //alert('done');
        } else
            progression = random;

    }, 1000);
});
    //----
    
     
     $(document).ready(function() {
    var progression = 0,
    progress = setInterval(function() 
    {
        $('#progress02 .progress-text').text(progression + '%');
        $('#progress02 .progress-bar').css({'width':progression+'%'});
        if(progression == 100) {
            clearInterval(progress);
            //alert('done');
        } else
            progression = random2;

    }, 1000);
});
//------

 
     $(document).ready(function() {
    var progression = 0,
    progress = setInterval(function() 
    {
        $('#progress03 .progress-text').text(progression + '%');
        $('#progress03 .progress-bar').css({'width':progression+'%'});
        if(progression == 100) {
            clearInterval(progress);
            //alert('done');
        } else
            progression = random3;

    }, 1000);
});
    
  
  
  
  
  //====================================================
   
   var infowindow = new google.maps.InfoWindow({
          //size: new google.maps.Size(150,50),
          content: content
        });
    
     // This function picks up the click and opens the corresponding info window and closes another open one
google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
        });
    
    
    
    
           
           
           
            
    
       for (i=0; i < parkingData.length; i++) {
           var rand = temp[Math.floor(Math.random()*temp.length)];
           //var rand = 6; 
           var occupancy =Math.floor((Math.random() * 100) + 1);
           //temp = 0;
           //new markers
           
             var point4 = new google.maps.LatLng(parkingData[i].lat, parkingData[i].lng);
              createMarker(point4, parkingData[i].name);
             
           //progress bar------------------
           
           
           
           //---------------------------
           
      
   
      
       }// end of for loop
       
       
       var content = '<br/>' + parkingData[12].name +'<br/>'+  '<div id="progress01">' + '<span class="progress-text"></span>' + '<div class="progress-bar"></div>' + 
                  '</div>'+ '</div>' + '<a href="#/garageDisplay/">'+ '<button type="submit" onClick="history.go(0)"> MORE INFO </button>' + '</a>';    
         var content01 = '<br/>' + parkingData[21].name +'<br/>'+   '<div id="progress02">' + '<span class="progress-text"></span>' + '<div class="progress-bar"></div>' + 
                  '</div>'+ '</div>' + '<a href="#/garageDisplay/">'+ '<button type="submit" onClick="history.go(0)"> MORE INFO </button>' + '</a>'; 
         var content02 = '<br/>' + parkingData[25].name +'<br/>'+   '<div id="progress03">' + '<span class="progress-text"></span>' + '<div class="progress-bar"></div>' + 
                  '</div>'+ '</div>' + '<a href="#/garageDisplay/">'+ '<button type="submit" onClick="history.go(0)"> MORE INFO </button>' + '</a>';  
    
    
     var point = new google.maps.LatLng(parkingData[12].lat, parkingData[12].lng);
       //set data to marker 
         createMarker(point, content);
         
         var point2 = new google.maps.LatLng(parkingData[21].lat, parkingData[21].lng);
           createMarker(point2, content01);
            var point3 = new google.maps.LatLng(parkingData[25].lat, parkingData[25].lng);
            createMarker(point3, content02);
        
      /*   function createClickableCircle(map, circle, info){
       var infowindow =new google.maps.InfoWindow({
            content: info
            
            
        });  */
        
        function createMarker(latlng, content) {
    var contentString = content;
    
    if (rand > 1){
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
       icon: "img/residentMid01.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        
          google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
       
        });
    }
    else if (rand === 2) {
         var marker2 = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/residentFull.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
         google.maps.event.addListener(marker2, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker2);
       
        });
    }
   else{
        
        var marker3 = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/residentLow01.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        
         google.maps.event.addListener(marker3, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker3);
       
        });
        
    }
 

   /* google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
       
        });*/
        
     
             
       /* google.maps.event.addListener(circle, 'click', function() {
            // alert(infowindow.content);
            infowindow.setPosition(circle.getCenter());
           infowindow.open(map);
          
                    
        });*/
        
        
 } 
        
    });
    
    
    
});





//---------------commuter-------------------------

parkingDataControllerModule.controller('CommuterMapController', function ($scope,$window,$routeParams,CommuterDataService){


    CommuterDataService.query().$promise.then(function(data){

    //history.go(0); 


       /* var pagecounter; 
       pagecounter++; 
       if (pagecounter > 1)
       {
           history.go(0);
           pagecounter = 0; 
       }*/

      /* $window.onload = function() {
    if(!window.location.hash) {
        $window.location = $window.location + '#loaded';
        $window.location.reload();
    }
};*/



        
        $scope.location = data; 
        
        
         var myLatLng = new google.maps.LatLng(26.370505, -80.102508);
         //var currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    
        
var random = Math.floor((Math.random()*100) + 1);
var random2 = Math.floor((Math.random()*100) + 1);
var random3 = Math.floor((Math.random()*100) + 1);
         
    
function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Go To Campus';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(myLatLng);
  });

}

  
        
    

 
   var i;  
   //var parkingLocation = new google.maps.LatLng(data[i].lat, data[i].lng);
   var parkingData = data;
   var temp = [0,1,2,3,4,5];
   var counter = 0;
  // var map;
   // this variable will collect the html which will eventually be placed in the side_bar 
       

   //var map = null;
    $window.map = new google.maps.Map(document.getElementById('map'), {
        /*center: {
            lat: -34.397,
            lng: 150.644
        },*/
        center: myLatLng,
        zoom: 16
    });
    
    
    
 
    //==================================
    
    
         //-----------TEST wath --------------------
     
      var marker = null;
        function autoUpdate() {
            
  navigator.geolocation.getCurrentPosition(function(position) {  
    var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                          position.coords.longitude);

    if (marker) {
      // Marker already created - Move it
      marker.setPosition(newPoint);
    }
    else {
      // Marker does not exist - Create it
      marker = new google.maps.Marker({
        position: newPoint,
        map: map,
        icon: "img/circle-icon.png"
      });
    }

    // Center the map on the new position
    function liveCenter(){
    map.setCenter(newPoint);
}
    function deleteMarkers(){
        clearMarkers();
        markers = [];
    }
    deleteMarkers();
//liveCenter(); 
  }); 

  // Call the autoUpdate() function every 5 seconds
  setTimeout(autoUpdate, 5000);
}

autoUpdate();
    
   
    
    //map center button========================
    
    var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    
    //========progress bar ========================
     
     $(document).ready(function() {
         
    var progression = 0,
    progress = setInterval(function() 
    {
        $('#progress01 .progress-text').text(progression + '%');
        $('#progress01 .progress-bar').css({'width':progression+'%'});
     /*   if(progression == 100) {
            clearInterval(progress);
            //alert('done');
        } else*/
            progression = random;

    }, 1000);
     delete progression;
});
    //----
    
     
     $(document).ready(function() {
    var progression = 0,
    progress = setInterval(function() 
    {
        $('#progress02 .progress-text').text(progression + '%');
        $('#progress02 .progress-bar').css({'width':progression+'%'});
       /* if(progression == 100) {
            clearInterval(progress);
            //alert('done');
        } else*/
            progression = random2;

    }, 1000);
     delete progression;;
});
//------

 
     $(document).ready(function() {
    var progression = 0,
    progress = setInterval(function() 
    {
        $('#progress03 .progress-text').text(progression + '%');
        $('#progress03 .progress-bar').css({'width':progression+'%'});
       /* if(progression == 100) {
            clearInterval(progress);
            //alert('done');
        } else*/
            progression = random3;

    }, 1000);
     delete progression;
});
    
  
    //=====================================
    //necessary to keep content through looping..why, i have no clue..yet
    var infowindow = new google.maps.InfoWindow({
         // content: content
          //size: new google.maps.Size(150,50)
           
        });
        
        
    //=========================================================
       
        for (i=0; i < parkingData.length; i++) {
           var rand = temp[Math.floor(Math.random()*temp.length)];
           //var rand = 6; 
           
           //temp = 0;
           //new markers
           
             var point4 = new google.maps.LatLng(parkingData[i].lat, parkingData[i].lng);
              createMarker(point4, parkingData[i].name);
             
           //progress bar------------------
           
           
           
           //---------------------------
           
      
   
      
       }// end of for loop
       
       
      
          
        
        
      /*   function createClickableCircle(map, circle, info){
       var infowindow =new google.maps.InfoWindow({
            content: info
            
            
        });  */
        
        function createMarker(latlng, content) {
    var contentString = content;
    
    if (rand > 3){
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
       icon: "img/commuterFull.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        
          google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
       
        });
    }
    else if (rand === 0) {
         var marker2 = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/commuterLow.png",
       zIndex: Math.round(latlng.lat()*-100000)<<5
        });
         google.maps.event.addListener(marker2, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker2);
       
        });
    }
   else{
        
        var marker3 = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/commuterLow.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        
         google.maps.event.addListener(marker3, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker3);
       
        });
        
    }
 

  
        
        
 } 
 
            var occupancy =Math.floor((Math.random() * 100) + 1);
           var occupancy2 =Math.floor((Math.random() * 100) + 1);
           var occupancy3 =Math.floor((Math.random() * 100) + 1);
 
   var content = '<br/>' + parkingData[14].name +'<br/>'+  occupancy + '<p>%</p>'+ '<a href="#/garageDisplay/">'+ '<button type="submit" onClick="history.go(1)">AVAILABILITY</button>' + '</a>';    
         var content01 = '<br/>' + parkingData[12].name +'<br/>'+ occupancy2 + '<p>%</p>'+ '<a href="#/garageDisplay/">'+ '<button type="submit" onClick="history.go(1)" >AVAILABILITY</button>' + '</a>' ; 
         var content02 = '<br/>' + parkingData[13].name +'<br/>'+ occupancy3 + '<p>%</p>' + '<a href="#/garageDisplay/">'+ '<button type="submit" onClick="history.go(1)">AVAILABILITY</button>' + '</a>'; 
    
    
     var point = new google.maps.LatLng(parkingData[14].lat, parkingData[14].lng);
       //set data to marker 
         createMarker2(point, content);
         
         var point2 = new google.maps.LatLng(parkingData[12].lat, parkingData[12].lng);
           createMarker2(point2, content01);
            var point3 = new google.maps.LatLng(parkingData[13].lat, parkingData[13].lng);
            createMarker2(point3, content02);
 
 
 function createMarker2(latlng, content) {
     
     var contentString = content;
     
     
     var marker01 = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/garageIcon.png",
       zIndex: Math.round(latlng.lat()*-100000)<<5
        });
      google.maps.event.addListener(marker01, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker01);
       
        });
     
 }
 //=================     
        
    });
    
    
    
});





//-----Resident--------------------------------


parkingDataControllerModule.controller('ResidentMapController', function ($scope,$window,$routeParams,ResidentDataService){


  
  

    
    ResidentDataService.query().$promise.then(function(data){











        
        $scope.location = data; 
        
        
         var myLatLng = new google.maps.LatLng(26.370505, -80.102508);
    

  
   var i;  
   //var parkingLocation = new google.maps.LatLng(data[i].lat, data[i].lng);
   var parkingData = data;
   var temp = [0,1,2,3,4,5];
   var counter = []; 
   
  // var map;
   // this variable will collect the html which will eventually be placed in the side_bar 
   //------Center map button to campus----------------------------
   
   
   
       function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Go To Campus';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(myLatLng);
  });

}
   
   
   
   
   //------------------------------------------------------------

   //var map = null;
    $window.map = new google.maps.Map(document.getElementById('map'), {
        /*center: {
            lat: -34.397,
            lng: 150.644
        },*/
        center: myLatLng,
        zoom: 16
    });
    
    //========Tracking data=========================
    
         //-----------TEST wath --------------------
     
      var marker = null;
        function autoUpdate() {
            
  navigator.geolocation.getCurrentPosition(function(position) {  
    var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                          position.coords.longitude);

    if (marker) {
      // Marker already created - Move it
      marker.setPosition(newPoint);
    }
    else {
      // Marker does not exist - Create it
      marker = new google.maps.Marker({
        position: newPoint,
        map: map,
        icon: "img/circle-icon.png"
      });
    }

    // Center the map on the new position
    function liveCenter(){
    map.setCenter(newPoint);
}
    function deleteMarkers(){
        clearMarkers();
        markers = [];
    }
    deleteMarkers();
//liveCenter(); 
  }); 

  // Call the autoUpdate() function every 5 seconds
  setTimeout(autoUpdate, 5000);
}

autoUpdate();
    
    //==========center call for campus===============
    
    
    var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    
    
    //=============================================
    
     var infowindow = new google.maps.InfoWindow({
         // content: content
          //size: new google.maps.Size(150,50)
           
        });
    
       
        for (i=0; i < parkingData.length; i++) {
           var rand = temp[Math.floor(Math.random()*temp.length)];
           //var rand = 6; 
           var occupancy =Math.floor((Math.random() * 100) + 1);
           //temp = 0;
           //new markers
           
             var point4 = new google.maps.LatLng(parkingData[i].lat, parkingData[i].lng);
              createMarker(point4, parkingData[i].name);
             
           //progress bar------------------
           
           
           
           //---------------------------
           
      
   
      
       }// end of for loop
       
       
      
         
        
      /*   function createClickableCircle(map, circle, info){
       var infowindow =new google.maps.InfoWindow({
            content: info
            
            
        });  */
        
        function createMarker(latlng, content) {
    var contentString = content;
    
    if (rand > 3){
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
       icon: "img/residentLow2.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        
          google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
       
        });
    }
    else if (rand === 0) {
         var marker2 = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/residentFull.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
         google.maps.event.addListener(marker2, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker2);
       
        });
    }
   else{
        
        var marker3 = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/residentMid01.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        
         google.maps.event.addListener(marker3, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker3);
       
        });
        
    
   }

   
 } 
       
        
    });// end of data function 
    
    
    
});



// Visitor Parking==================================================


parkingDataControllerModule.controller('VisitorMapController', function ($scope,$window,$routeParams,VisitorDataService){


  
  

    
    VisitorDataService.query().$promise.then(function(data){











        
        $scope.location = data; 
        
        
         var myLatLng = new google.maps.LatLng(26.370505, -80.102508);
    

  
   var i;  
   //var parkingLocation = new google.maps.LatLng(data[i].lat, data[i].lng);
   var parkingData = data;
   var temp = [0,1,2,3,4,5];
   var counter = []; 
   
  // var map;
   // this variable will collect the html which will eventually be placed in the side_bar 
   //------Center map button to campus----------------------------
   
   
   
       function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Go To Campus';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(myLatLng);
  });

}
   
   
   
   
   //------------------------------------------------------------

   //var map = null;
    $window.map = new google.maps.Map(document.getElementById('map'), {
        /*center: {
            lat: -34.397,
            lng: 150.644
        },*/
        center: myLatLng,
        zoom: 16
    });
    
    
    //========Tracking data=========================
    
         //-----------TEST wath --------------------
     
      var marker = null;
        function autoUpdate() {
            
  navigator.geolocation.getCurrentPosition(function(position) {  
    var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                          position.coords.longitude);

    if (marker) {
      // Marker already created - Move it
      marker.setPosition(newPoint);
    }
    else {
      // Marker does not exist - Create it
      marker = new google.maps.Marker({
        position: newPoint,
        map: map,
        icon: "img/circle-icon.png"
      });
    }

    // Center the map on the new position
    function liveCenter(){
    map.setCenter(newPoint);
}
    function deleteMarkers(){
        clearMarkers();
        markers = [];
    }
    deleteMarkers();
//liveCenter(); 
  }); 

  // Call the autoUpdate() function every 5 seconds
  setTimeout(autoUpdate, 5000);
}

autoUpdate();
    
    //==========center call for campus===============
    
    
    var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    
    
    //=============================================
    
      var infowindow = new google.maps.InfoWindow({
         // content: content
          //size: new google.maps.Size(150,50)
           
        });
    
       
        for (i=0; i < parkingData.length; i++) {
           var rand = temp[Math.floor(Math.random()*temp.length)];
           //var rand = 6; 
           var occupancy =Math.floor((Math.random() * 100) + 1);
           //temp = 0;
           //new markers
           
             var point4 = new google.maps.LatLng(parkingData[i].lat, parkingData[i].lng);
              createMarker(point4, parkingData[i].name);
             
           //progress bar------------------
           
           
           
           //---------------------------
           
      
   
      
       }// end of for loop
       
       
      
         
        
      /*   function createClickableCircle(map, circle, info){
       var infowindow =new google.maps.InfoWindow({
            content: info
            
            
        });  */
        
        function createMarker(latlng, content) {
    var contentString = content;
    
    if (rand > 3){
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
       icon: "img/visitorLow.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        
          google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
       
        });
    }
    else if (rand === 0) {
         var marker2 = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/visitorFull.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
         google.maps.event.addListener(marker2, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker2);
       
        });
    }
   else{
        
        var marker3 = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/visitorMid.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        
         google.maps.event.addListener(marker3, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker3);
       
        });
        
    
   }

   
 } 
    
      
        
    });// end of data function 
    
    
    
});

//===faculty===========================


parkingDataControllerModule.controller('FacultyMapController', function ($scope,$window,$routeParams,FacultyDataService){


  
  

    
    FacultyDataService.query().$promise.then(function(data){











        
        $scope.location = data; 
        
        
         var myLatLng = new google.maps.LatLng(26.370505, -80.102508);
    

  
   var i;  
   //var parkingLocation = new google.maps.LatLng(data[i].lat, data[i].lng);
   var parkingData = data;
   var temp = [0,1,2,3,4,5];
   var counter = []; 
   
  // var map;
   // this variable will collect the html which will eventually be placed in the side_bar 
   //------Center map button to campus----------------------------
   
   
   
       function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Go To Campus';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(myLatLng);
  });

}
   
   
   
   
   //------------------------------------------------------------

   //var map = null;
    $window.map = new google.maps.Map(document.getElementById('map'), {
        /*center: {
            lat: -34.397,
            lng: 150.644
        },*/
        center: myLatLng,
        zoom: 16
    });
    
    
    //==========Tracking Data============
    
         //-----------TEST wath --------------------
     
      var marker = null;
        function autoUpdate() {
            
  navigator.geolocation.getCurrentPosition(function(position) {  
    var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                          position.coords.longitude);

    if (marker) {
      // Marker already created - Move it
      marker.setPosition(newPoint);
    }
    else {
      // Marker does not exist - Create it
      marker = new google.maps.Marker({
        position: newPoint,
        map: map,
        icon: "img/circle-icon.png"
      });
    }

    // Center the map on the new position
    function liveCenter(){
    map.setCenter(newPoint);
}
    function deleteMarkers(){
        clearMarkers();
        markers = [];
    }
    deleteMarkers();
//liveCenter(); 
  }); 

  // Call the autoUpdate() function every 5 seconds
  setTimeout(autoUpdate, 5000);
}

autoUpdate();
    
    //==========center call for campus===============
    
    
    var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    
    
    //=============================================
     var infowindow = new google.maps.InfoWindow({
         // content: content
          //size: new google.maps.Size(150,50)
           
        });
    
       
        for (i=0; i < parkingData.length; i++) {
           var rand = temp[Math.floor(Math.random()*temp.length)];
           //var rand = 6; 
           var occupancy =Math.floor((Math.random() * 100) + 1);
           //temp = 0;
           //new markers
           
             var point4 = new google.maps.LatLng(parkingData[i].lat, parkingData[i].lng);
              createMarker(point4, parkingData[i].name);
             
           //progress bar------------------
           
           
           
           //---------------------------
           
      
   
      
       }// end of for loop
       
       
      
         
        
      /*   function createClickableCircle(map, circle, info){
       var infowindow =new google.maps.InfoWindow({
            content: info
            
            
        });  */
        
        function createMarker(latlng, content) {
    var contentString = content;
    
    if (rand > 3){
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
       icon: "img/facultyLow.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        
          google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
       
        });
    }
    else if (rand === 0) {
         var marker2 = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/facultyFull.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
         google.maps.event.addListener(marker2, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker2);
       
        });
    }
   else{
        
        var marker3 = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/facultyMid.png",
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        
         google.maps.event.addListener(marker3, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker3);
       
        });
        
    
   }

   
 } 
    
    
      
        
    });// end of data function 
    
    
    
});








//=============================RANDOM GENERATOR=============================================


var randomDataControllerModule = angular.module('RandomDataControllerModule',[]);


randomDataControllerModule.controller('RandomMapController', function ($scope,$window,$routeParams,ParkingDataService,RandomDataService){
    
   // var temp = [20,]
    
   function refreshpage(){
            history.go(0);
          
   }
   
  var refresh;
    var rand01 = Math.floor((Math.random()*5) + 1);
    var rand = Math.floor((Math.random()*100) + 1);
    var rand2 = Math.floor((Math.random()*100) + 1);
    var rand3 = Math.floor((Math.random()*100) + 1);
    var rand4 = Math.floor((Math.random()*100) + 1);
    var rand5 = Math.floor((Math.random()*100) + 1);
     if (rand01 > 1){
       //refresh=0; 
   refreshpage();
   }
   /*else{
     
   refresh = 2;
   
   }*/
   
   
  /* var occupancy2 =Math.floor((Math.random() * 100) + 1);
   var occupancy3 =Math.floor((Math.random() * 100) + 1);
   var occupancy4 =Math.floor((Math.random() * 100) + 1);
   var occupancy5 =Math.floor((Math.random() * 100) + 1);*/
  
    
    $(document).ready(function() {
    var progression = 0,
    progress = setInterval(function() 
    {
        $('#progress .progress-text').text(progression + '%');
        $('#progress .progress-bar').css({'width':progression+'%'});
        if(progression == 100) {
            clearInterval(progress);
            //alert('done');
        } else
            progression = rand;

    }, 1000);
});
    
   //====FLOOR 2 ======= 
     $(document).ready(function() {
    var progression = 0,
    progress = setInterval(function() 
    {
        $('#progress2 .progress-text').text(progression + '%');
        $('#progress2 .progress-bar').css({'width':progression+'%'});
     /*   if(progression == 100) {
            clearInterval(progress);
            //alert('done');
        } else*/
            progression = rand2;

    }, 1000);
});
    
     //====FLOOR 3 ======= 
     $(document).ready(function() {
    var progression = 0,
    progress = setInterval(function() 
    {
        $('#progress3 .progress-text').text(progression + '%');
        $('#progress3 .progress-bar').css({'width':progression+'%'});
        if(progression == 100) {
            clearInterval(progress);
            //alert('done');
        } else
            progression = rand3;

    }, 1000);
});
//=========LVEL 4 ========================
 $(document).ready(function() {
    var progression = 0,
    progress = setInterval(function() 
    {
        $('#progress4 .progress-text').text(progression + '%');
        $('#progress4 .progress-bar').css({'width':progression+'%'});
        if(progression == 100) {
            clearInterval(progress);
            //alert('done');
        } else
            progression = rand4;

    }, 1000);
});
//=========LEVEL 5=============================
 $(document).ready(function() {
    var progression = 0,
    progress = setInterval(function() 
    {
        $('#progress5 .progress-text').text(progression + '%');
        $('#progress5 .progress-bar').css({'width':progression+'%'});
        if(progression == 100) {
            clearInterval(progress);
            //alert('done');
        } else
            progression = rand5;

    }, 1000);
});



 function occupy(){
        if (rand > 65){
   var occupancy = Math.floor((Math.random() * 50) + 1);
        }
         else if (rand < 35){
        occupancy = Math.floor((Math.random() * 200) + 100);    
        }
        else if (rand < 65) {
        occupancy = Math.floor((Math.random() * 99) + 50);    
        }
   //Math.floor((Math.random() * 100) + 1);
   return occupancy;  
   }
   
    function occupy2(){
        if (rand2 > 65){
   var occupancy2 = Math.floor((Math.random() * 50) + 1);
        }
        else if (rand2 < 35){
        occupancy2 = Math.floor((Math.random() * 200) + 100);    
        }
        else if (rand2 < 65) {
        occupancy2 = Math.floor((Math.random() * 99) + 50);    
        }
   //Math.floor((Math.random() * 100) + 1);
   return occupancy2;  
   }
   
   function occupy3(){
        if (rand3 > 65){
   var occupancy3 = Math.floor((Math.random() * 50) + 1);
        }
       else if (rand3 < 35){
        occupancy3 = Math.floor((Math.random() * 200) + 100);    
        }
        else if (rand3 < 65) {
        occupancy3 = Math.floor((Math.random() * 99) + 50);    
        }
   //Math.floor((Math.random() * 100) + 1);
   return occupancy3;  
   }
   
   function occupy4(){
        if (rand4 > 65){
   var occupancy4 = Math.floor((Math.random() * 50) + 1);
        }
        else if (rand4 < 35){
        occupancy4 = Math.floor((Math.random() * 200) + 100);    
        }
        else if (rand4< 65) {
        occupancy4 = Math.floor((Math.random() * 99) + 50);    
        }
   //Math.floor((Math.random() * 100) + 1);
   return occupancy4;  
   }
   
   function occupy5(){
        if (rand5 > 65){
   var occupancy5 = Math.floor((Math.random() * 50) + 1);
        }
        else if (rand5 < 35){
        occupancy5 = Math.floor((Math.random() * 200) + 100);    
        }
        else if (rand5 < 65) {
        occupancy5 = Math.floor((Math.random() * 99) + 50);    
        }
   //Math.floor((Math.random() * 100) + 1);
   return occupancy5;  
   }
   
   
   
    $scope.spotsAvailable = document.getElementById("occupy").innerHTML = occupy(); 
  $scope.spotsAvailable2 = document.getElementById("occupy2").innerHTML = occupy2();
  $scope.spotsAvailable3 = document.getElementById("occupy3").innerHTML = occupy3();
  $scope.spotsAvailable4 = document.getElementById("occupy4").innerHTML = occupy4();
  $scope.spotsAvailable5 = document.getElementById("occupy5").innerHTML = occupy5();
   
   
   
//====page refresh=====

function refreshPage(){
    //window.location.reload();
    history.go(0); 
} 
    
//================================================================    
     RandomDataService.query().$promise.then(function(data){
         
         $scope.result = data[0]; 
         
          
      function move () {
             
                var elem = document.getElementById("myBar");   
                var width = 50;
               var id = setInterval(frame, 10);
                function frame() {
                  if (width >= 70) {
                    clearInterval(id);
                  } else {
                    width++; 
                    elem.style.width = width + '%'; 
                  }
                }
                
              }
         
         
     });
    
    
    
    
});
