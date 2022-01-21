angular
  .module("DashboardApp", ["moment-picker",
    "ngRoute",
    "angular-loading-bar",
    "ngAnimate",
    "ngResource",
    'ngMessages',
    "toaster",
    "ng-file-input",
    "cp.ngConfirm",
    "ui.bootstrap", "ngAudio"
  ])
  .config([
    "$locationProvider",
    "$routeProvider",
    "appsettings",
    function ($locationProvider, $routeProvider, appsettings) {
      $locationProvider.hashPrefix("!");
      $locationProvider.html5Mode({
        enabled: false,
        requireBase: true,
        rewriteLinks: true
      });

      $routeProvider
        .when("/", {
          templateUrl: "dashboardindex/dashboardindex.html",
          resolve: {
            CheckAuthentication: function () {
              var accessToken = localStorage.getItem("accessToken");

              if (accessToken == null) {

                localStorage.removeItem("accessToken");
                window.location.href = appsettings.routePath + "/#!/login";

              }
            }
          }
        })
        .when("/dashboardindex", {
          templateUrl: "dashboardindex/dashboardindex.html"
        })
        .when("/dashboardcourses", {
          templateUrl: "dashboardcourses/dashboardcourses.html"
        })
        .when("/dashboardevents", {
          templateUrl: "dashboardevents/dashboardevents.html"
        })
        .when("/dashboardprogrames", {
          templateUrl: "dashboardprogrames/dashboardprogrames.html"
        })
        .when("/dashboardnews", {
          templateUrl: "dashboardnews/dashboardnews.html"
        }).when("/dashboardnewscategories", {
          templateUrl: "dashboardnewscategories/dashboardnewscategories.html"
        }).when("/dashboardnewnewscategory", {
          templateUrl: "dashboardnewnewscategory/dashboardnewnewscategory.html"
        }).when("/dashboardeditnewscategories/:Cat_Id", {
          templateUrl: "dashboardeditnewscategories/dashboardeditnewscategories.html"
        }).when("/dashboardnewnews", {
          templateUrl: "dashboardnewnews/dashboardnewnews.html"
        }).when("/dashboardeditjobscategory/:Cat_Id", {
          templateUrl: "dashboardeditjobscategories/dashboardeditjobscategories.html"
        }).when("/dashboardeditjob/:Job_Id", {
          templateUrl: "dashboardeditjob/dashboardeditjob.html"
        })
        .when("/dashboardjobs", {
          templateUrl: "dashboardjobs/dashboardjobs.html"
        }).when('/dashboardjobscategories', {
          templateUrl: 'dashboardjobscategories/dashboardjobscategories.html'
        }).when('/dashboardnewjobscategory', {
          templateUrl: 'dashboardnewjobscategory/dashboardnewjobscategory.html'
        })
        .when('/dashboardnewcourse', {

          templateUrl: 'dashboardnewcourse/dashboardnewcourse.html'
        })
        .when('/dashboardeditnews/:News_Id', {

          templateUrl: 'dashboardeditnews/dashboardeditnews.html'
        })
        .when('/dashboardnewprogramecourse/:Programe_Id', {

          templateUrl: 'dashboardnewprogramecourse/dashboardnewprogramecourse.html'
        }).when('/dashboardnewprogramecoursegroup/:Crs_Id', {

          templateUrl: 'dashboardnewprogramecoursegroup/dashboardnewprogramecoursegroup.html'
        })
        .when('/dashboardnewevent', {
          templateUrl: 'dashboardnewevent/dashboardnewevent.html'
        }).when('/dashboardnewjob', {

          templateUrl: 'dashboardnewjob/dashboardnewjob.html'

        }).when('/dashboardnewProgramecategory', {

          templateUrl: 'dashboardneweprogramecategory/dashboardneweprogramecategory.html'

        }).when('/dashboardeditProgramecategory/:Cat_Id', {

          templateUrl: 'dashboardeditprogramescategories/dashboardeditprogramescategories.html'

        }).when('/dashboardprogramecourses/:Programe_Id', {

          templateUrl: 'dashboardprgramecourses/dashboardprgramecourses.html'

        })
        .when('/dashboardnewprograme', {

          templateUrl: 'dashboardnewprograme/dashboardnewprograme.html'

        }).when('/dashboardnewnews', {

          templateUrl: 'dashboardnewnews/dashboardnewnews.html'
        }).when('/dashboardcoursescategories', {
          templateUrl: 'dashboardcoursescategories/dashboardcoursescategories.html'

        }).when('/dashboardnewcoursecategory', {

          templateUrl: 'dashboardcoursesnewcategory/dashboardnewcoursecategory.html'


        }).when('/dashboardeditcoursecategory/:CrsCats_Id', {

          templateUrl: "dashboardeditcoursescategories/dashboardeditcoursecategory.html"
        })
        .when('/dashboardnewcoursegroup/:Crs_Id', {

          templateUrl: "dashboardnewcoursegroup/dashboardnewcoursegroup.html"
        }).when('/dashboardeditcourse/:Crs_Id', {

          templateUrl: "dashboardeditcourse/dashboardeditcourse.html"

        }).when('/dashboardnewcourselessons/:Crs_Id', {

          templateUrl: "dashboardnewcourselessons/dashboardnewcourselessons.html"

        }).when('/dashboardcourselessons/:Crs_Id', {

          templateUrl: "dashboardcourselessons/dashboardcourselessons.html"

        }).when('/dashboardcoursesstudents/:Crs_Id', {

          templateUrl: "dashboardcoursestudents/dashboardcoursestudents.html"

        }).when('/dashboardcoursegroups/:Crs_Id', {

          templateUrl: "dashboardcoursegroups/dashboardcoursegroups.html"

        })
        .when('/dashboardeditcourselesson/:Lesson_Id', {

          templateUrl: "dashboardeditcourselesson/dashboardeditcourselesson.html"

        }).when('/dashboardprogramecoursegroups/:Crs_Id', {

          templateUrl: "dashboardprogramecoursegroups/dashboardprogramecoursegroups.html"

        }).when("/dashboardeventscategories", {

          templateUrl: "dashboardeventscategories/dashboardeventscategories.html"
        }).when("/dashboardneweventscategory", {

          templateUrl: "dashboardneweventscategory/dashboardneweventscategory.html"

        }).when("/dashboardediteventscategories/:Cat_Id", {

          templateUrl: "dashboardediteventscategories/dashboardediteventscategories.html"

        }).when("/dashboardeditevent/:Event_Id", {

          templateUrl: "dashboardeditevent/dashboardeditevent.html"

        }).when("/dashboardprogramescategories", {

          templateUrl: "dashboardprogramescategories/dashboardprogramescategories.html"
        }).when("/dashboardeditcoursegroup/:Group_Id", {

          templateUrl: "dashboardeditcoursegroup/dashboardeditcoursegroup.html"
        })

    }
  ]).constant("appsettings", {

    serverPath: "http://localhost:50816",

    routePath: "http://localhost:8000"

  })
