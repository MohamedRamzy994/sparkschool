angular
.module("TeacherApp",
 ["moment-picker",
   
  "ngRoute",

 "angular-loading-bar", 
 "ngAnimate",
 "ngResource",
 'ngMessages',
 "toaster",
"ng-file-input",
"cp.ngConfirm",
"ngSanitize",
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
        templateUrl: "teacherindex/teacherindex.html"
      })
      .when("/teacherindex", {
        templateUrl: "teacherindex/teacherindex.html"
      })
      .when("/teachercourses", {
        templateUrl: "teachercourses/teachercourses.html"
      })
      .when("/teachernewcourse", {
        templateUrl: "teachernewcourse/teachernewcourse.html"
      })
      .when("/teacheranalytics", {
        templateUrl: "teacheranalytics/teacheranalytics.html"
      })
      .when("/teachersettings", {
        templateUrl: "teachersettings/teachersettings.html"
      })
      .when("/dashboardjobs", {
        templateUrl: "dashboardjobs/dashboardjobs.html"
      }).when('/dashboardnewcourse',{

        templateUrl:'dashboardnewcourse/dashboardnewcourse.html'
      }).when('/dashboardnewevent',{
        templateUrl:'dashboardnewevent/dashboardnewevent.html'
      }).when('/dashboardnewjob',{

        templateUrl:'dashboardnewjob/dashboardnewjob.html'

      }).when('/dashboardnewprograme',{

        templateUrl:'dashboardnewprograme/dashboardnewprograme.html'

      }).when('/dashboardnewnews',{

        templateUrl:'dashboardnewnews/dashboardnewnews.html'
      }).when('/dashboardcoursescategories',{
        templateUrl:'dashboardcoursescategories/dashboardcoursescategories.html'

      }).when('/dashboardnewcoursecategory',{

        templateUrl:'dashboardcoursesnewcategory/dashboardnewcoursecategory.html'


      }).when('/dashboardeditcoursecategory/:CrsCats_Id',{

        templateUrl :"dashboardeditcoursescategories/dashboardeditcoursecategory.html"
      }).when('/dashboardeditcourse/:Crs_Id',{

        templateUrl:"dashboardeditcourse/dashboardeditcourse.html"

      }).when('/dashboardcourseslessons',{

        templateUrl:"dashboardcourseslessons/dashboardcourseslessons.html"

      }).when('/dashboardnewlesson/:Crs_Id',{

        templateUrl:"dashboardnewcourselessons/dashboardnewcourselessons.html"
       
      }).when('/dashboardeditcourselesson/:Lesson_Id',{

        templateUrl:"dashboardeditcourselesson/dashboardeditcourselesson.html"

      });
  }
]).constant("appsettings",{

  serverPath:"http://localhost:50816"

})