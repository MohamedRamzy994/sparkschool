angular
.module("StudentApp",
 ["moment-picker",
   
  "ngRoute",

 "angular-loading-bar", 
 "ngAnimate",
 "ngResource",
 'ngMessages',
 "toaster",
"ng-file-input",
"cp.ngConfirm",
"ui.bootstrap"])
.config([
  "$locationProvider",
  "$routeProvider",
  function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix("!");
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: true,
      rewriteLinks: true
    });

    $routeProvider
      .when("/", {
        templateUrl: "studentindex/studentindex.html"
      })
      .when("/studentindex", {
        templateUrl: "studentindex/studentindex.html"
      })
      .when("/studentcourses", {
        templateUrl: "studentcourses/studentcourses.html"
      })
      .when("/studentanalytics", {
        templateUrl: "studentanalytics/studentanalytics.html"
      })
      .when("/studentsettings", {
        templateUrl: "studentsettings/studentsettings.html"
      })
     
  }
]).constant("appsettings",{

  serverPath:"http://localhost:8080"

})