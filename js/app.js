(function(){
  'use strict'; 
var module = angular.module('app', ['onsen']);

module.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
  $scope.usercode       =   $window.localStorage.usercode;
  $scope.userfullname   =   $window.localStorage.userfullname;
  $scope.useremail      =   $window.localStorage.useremail;
  $scope.systemmsg      =   $window.localStorage.systemmsg;
  $scope.getMember = function(id) {
    console.log(id);
  };
}]);
// camera disconstruture 
    module.controller('AppController', function($scope, $data) {
    $scope.camzero = function() {
        camdel();
    };
  });
// Example Controller   
    module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert('tappaed');
      }, 100);
    };
  });
 // loging Controller 
module.controller('UserController', function ($scope, $http, $data, $window,$sce) {

    $scope.user = {};
    $scope.login = function() 
    {
        if(Object.getOwnPropertyNames($scope.user).length > 0)
        {
        $http({
            method : 'POST',
            url : 'http://madebypakistan.com/projects/server/getauth.php',
            data : $scope.user
        }).success(function(data, status) {
            if(data!=='null')
            {    
			$scope.status             =   status;
                        $scope.userdata           =   data;
        		localStorage.userfullname =   data.firstname+" "+data.middlename+" "+data.lastname;
                        localStorage.useremail    =   data.useremail;
                        localStorage.userstatus   =   data.userstatus;
                        localStorage.usercode     =   data.usercode;
                        localStorage.usertoken    =   data.usercode;
                        localStorage.systemmsg    =   data.systemmsg;
                        localStorage.serverurl	  =   data.serverurl;
                        localStorage.userstatus   =   true;  
                        if(localStorage.usertoken==='undefine')
                        {
                            localStorage.usertoken=null;
                            localStorage.userstatus=false;
                            //delete localStorage.usertoken;
                        }
                        else
                        {    
                            $scope.usercode       =   $window.localStorage.usercode;
                            $scope.userfullname   =   $window.localStorage.userfullname;
                            $scope.useremail      =   $window.localStorage.useremail;
                            $scope.systemmsg      =   $window.localStorage.systemmsg;
                            $scope.userstatus     =   $window.localStorage.userstatus;
                            //$scope.servername   =   $window.localStorage.servername;
                            $scope.serverurl	  =   $sce.trustAsResourceUrl($window.localStorage.serverurl);
                            //console.log($scope.user);
                            location.reload(true);
                        }  
            }           
//$scope.result = data; // Show result from server in our <pre></pre> element
                        //console.log(localStorage.usertoken);
		})
		.
		error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;			
		});
            }
            else
            {
              //alert('Username and Password Required');

      $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Authication Alert!',
                    // (string | mandatory) the text inside the notification
                    text: 'Username and Password Required'
                  });
             return false;   
            } 
            };   
        });


/*************************************************************************/
  module.controller('DetailController', function($scope, $data, $sce, $window) {
    $scope.item = $data.selectedItem;
        if($data.selectedItem.id===2){
          setTimeout(function() {
          caminit();
         }, 100);  
        }
        else if($data.selectedItem.id===1)
        {
         $scope.serverurl      = $sce.trustAsResourceUrl($window.localStorage.serverurl);	
        }
        else
        {
            controller = null;
        }    
  });
 
 module.controller('MasterController', function($scope, $data,$window,$sce) {
   if(localStorage.usertoken==='undefine' || localStorage.usertoken===null )
    {
        localStorage.usertoken=null;
        $scope.usercode=null; //       =   $window.localStorage.usercode;
        $scope.userfullname=null; //   =   $window.localStorage.userfullname;
        $scope.useremail=null;   //      =   $window.localStorage.useremail;
        $scope.systemmsg=null;   //      =   $window.localStorage.systemmsg;
        $scope.userstatus   =   false; 
        $scope.servername   =   null; 
    }
    else
    {    
        $scope.usercode       =   $window.localStorage.usercode;
        $scope.userfullname   =   $window.localStorage.userfullname;
        $scope.useremail      =   $window.localStorage.useremail;
        $scope.systemmsg      =   $window.localStorage.systemmsg;
        $scope.useremail      =   $window.localStorage.useremail;
        $scope.userstatus     =   $window.localStorage.userstatus;
        $scope.serverurl      = $sce.trustAsResourceUrl($window.localStorage.serverurl);
        
    }   
     $scope.items = $data.items;  
    $scope.showDetail = function(index) {
      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;
      if(selectedItem.id===1)
      {
       $scope.ons.navigator.pushPage('home.html', {title : selectedItem.title});   
      }
      else if(selectedItem.id===2)
      {
        $scope.ons.navigator.pushPage('camera.html', {title : selectedItem.title}); 
      }
      else
      {    
        $scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
      }
    };
  });

  module.factory('$data', function() {
      var data = {};
      data.items = [
          { 
              id:1,
              title: 'Home Automation',
              icon: 'home.png',
              desc: ''
          },
          { 
              id:2,
              title: 'Video Surveillance',
              icon: 'camera.png',
              desc: ''
          },
          { 
              id:3,
              title: 'Digital Tracking',
              icon: 'tracker.png',
              desc: ''
          },
          { 
              id:4,
              title: 'Configuration',
              icon: 'config.png',
              desc: ''
          }
      ]; 
      
      return data;
  });
})();