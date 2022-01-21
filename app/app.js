"use strict";

// Declare app level module which depends on views, and components

var app = angular
  .module("myApp", [
    "ngRoute",
    "ngResource",
    'ngMessages',
    "toaster",
    "ngAnimate",
    "angular-loading-bar",
    "AuthenticationBearerToken"
  ]);
app.config([
  "$locationProvider",
  "$routeProvider",
  "$httpProvider",
  "appsettings",
  function ($locationProvider, $routeProvider, $httpProvider,appsettings) {
    $locationProvider.hashPrefix("!");
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: true,
      rewriteLinks: true
    });
    $routeProvider
      .when("/", {
        templateUrl: "home/home.html"
      })
      .when("/home", {
        templateUrl: "home/home.html"
      })
      .when("/allcourses", {
        templateUrl: "allcourses/allcourses.html"
      })
       .when("/allprogrames", {
        templateUrl: "allprogrames/allprogrames.html"
      })
      .when("/staff", {
        templateUrl: "staff/staff.html"
      })
      .when("/news", {
        templateUrl: "news/news.html"
      })
      .when("/about", {
        templateUrl: "about/about"
      })
      .when("/jobs", {
        templateUrl: "jobs/jobs.html"
      })
      .when("/events", {
        templateUrl: "events/events.html"
      })
      .when("/register", {
        templateUrl: "register/register.html",
        resolve: {
          CheckAuthentication: function () {
            var accessToken =  localStorage.getItem("accessToken");
            if (accessToken) {

              window.location.href =appsettings.routePath+"/index.html#!/home";
              window.location.reload();
            }
            else {
              window.location.href = appsettings.routePath+"/index.html#!/register";


            }


          }
        }

      })
      .when("/login", {
        templateUrl: "login/login.html",
        resolve: {
          CheckAuthentication: function () {
            var accessToken =  localStorage.getItem("accessToken");
            if (accessToken) {

              window.location.href = appsettings.routePath+"/index.html#!/home";
              window.location.reload();
            }
            else {
              window.location.href =  appsettings.routePath+"/index.html#!/login";


            }


          }


        }
      })
      .when("/coursedetails", {
        templateUrl: "coursedetails/coursedetails.html"
      })
      .when("/applyforcourse", {
        templateUrl: "applyforcourse/applyforcourse.html"
      }).when("/registerthankyou",{

        templateUrl:"registerthanks/registerthanks.html"

      })
    $routeProvider.otherwise({ redirectTo: "/" });
  }
]).constant("appsettings",{
  
      serverPath:"http://localhost:50816",
      routePath:"http://localhost:8000"
  
    })
  
app.controller("NavBarController", NavBarController);

NavBarController.$inject = ['$location', '$http','AuthenticationBearerRoleFactory',"appsettings"];

function NavBarController($location, $http,AuthenticationBearerRoleFactory,appsettings) {
  var vm = this;

  vm.Authenticated = function () {

    var accessToken =  localStorage.getItem("accessToken");

    var authHeaders = {};

    if (accessToken) {

      authHeaders.Authorization = "Bearer" + accessToken;

    }

    var isLoggedIn = (accessToken) ? true : false;

    return isLoggedIn;



  }
  vm.logOff = function () {

     localStorage.removeItem("accessToken");
    $location.path("/home");
    location.reload();


  }

  if (vm.Authenticated() == true) {

    vm.FullName = GetUserName().then(function (response) {

      vm.FullName = response.data;


    });
  }
  function GetUserName() {
    var accessToken =  localStorage.getItem("accessToken");

    
        var authHeaders = {};
    
        if (accessToken) {
    
          authHeaders.Authorization = "Bearer " + accessToken;
       
    
        }
    var response = $http({
      url: appsettings.serverPath + "/api/Account/GetUserName",
      method: "GET",
      headers: {

        'Content-Type': 'application/json;charset=utf-8',
        'Authorization':authHeaders.Authorization


      },
      params: { "UserName":  localStorage.getItem("username") }




    })
    return response;


  }


  vm.Dashboard = function () {

    AuthenticationBearerRoleFactory.GetUserRole().then(function (response) {

      if (response.data=="Manager") {

         window.location.href = "http://localhost:8000/admin.html/";
         
      } else if(response.data=="Teacher") {
        window.location.href = "http://localhost:8000/teacher.html/";
      }else if(response.data=="Student"){
       
        window.location.href = "http://localhost:8000/student.html/";

      }else if(response.data=="Staff"){



      } 
      else{
        alert("hi");


      }



     
      
    });

  

  }

}
app.directive("navbarDirective", function () {
  return {
    restrict: "E",
    templateUrl: "shared/navbardirective.html",
    transclude: true,
    controller: "NavBarController as vm",
    link: function ($scope, element, attrs) {



    }


  }

})

