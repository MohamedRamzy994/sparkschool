

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('CoursesController', CoursesController)

    CoursesController.$inject = ['CoursesFactory', 'toaster', "ActivateCoursesFactory", "$route", "$ngConfirm", "ActiveCoursesCategoriesFactory"];

    function CoursesController(CoursesFactory, toaster, ActivateCoursesFactory, $route, $ngConfirm, ActiveCoursesCategoriesFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.Courses = [];
        vm.CoursesCategories = [];



        // Pagination Intialization Bootstrap-ui
        vm.totalItems = 0;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.maxSize = 5; //Number of pager buttons to show

        vm.setPage = function (pageNo) {
            vm.currentPage = pageNo;
        };

        vm.pageChanged = function () {

        };

        vm.setItemsPerPage = function (num) {
            vm.itemsPerPage = num;
            vm.currentPage = 1; //reset to first page
        }

        ActiveCoursesCategoriesFactory.query(function (response) {



            vm.CoursesCategories = response;

        }, function (response) {


            if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                toaster.pop(
                    {
                        type: "error",
                        title: "SPARK SCHOOL",
                        body: response.statusText
                    });

            }




        });



        CoursesFactory.Get(function (response) {

            

            vm.Courses = response;
            vm.totalItems = vm.Courses.length;


        }, function (response) {


            if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                toaster.pop(
                    {
                        type: "error",
                        title: "SPARK SCHOOL",
                        body: response.statusText
                    });

            }




        })

        vm.Activate = function (Crs_Id) {

            var entry = new ActivateCoursesFactory();

            entry.Crs_Id = Crs_Id;
            ActivateCoursesFactory.Activate(entry, function (response) {
                toaster.pop(
                    {
                        type: "success",
                        title: "SPARK SCHOOL",
                        body: response.Crs_Name + "Course Activated Successfuly !"
                    });
                $route.reload();



            }, function (response) {

                if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                    toaster.pop(
                        {
                            type: "error",
                            title: "SPARK SCHOOL",
                            body: response.statusText
                        });

                }
            })

        }


        vm.Confirm = function (Crs_Id) {

            vm.Crs_Id = Crs_Id;
            $ngConfirm({
                title: 'Confirm!',
                content: '<strong>Do you want to Delete Course ?</strong>',
                buttons: {
                    Delete: {
                        text: 'Yes Sure',
                        btnClass: 'btn-blue',
                        action: function () {

                            var entry = new CoursesFactory();
                            entry.Crs_Id = vm.Crs_Id;


                            CoursesFactory.Delete(entry, function (response) {
                                toaster.pop(
                                    {
                                        type: "success",
                                        title: "SPARK SCHOOL",
                                        body: response.Crs_Name + " Course Deleted Successfuly !"
                                    });

                                $route.reload();

                            }, function (response) {
                                if (response.status == 400 || response.status == 405 || response.status == 500 || response.status == 502 || response.status == 401) {


                                    toaster.pop(
                                        {
                                            type: "error",
                                            title: "SPARK SCHOOL",
                                            body: response.statusText
                                        });

                                }

                            })


                        }
                    },

                    close: function (scope, button) {
                        // closes the modal
                    },
                }
            });

        }



    }
})();

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('CoursesFactory', CoursesFactory)

    CoursesFactory.$inject = ['$resource', 'appsettings'];

    function CoursesFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;


        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";

        return $resource(appsettings.serverPath + '/api/Dashboard/Courses', {}, {

            Get: {
                method: "GET",


                headers: {

                    'Authorization': authHeader.Authorization

                },
                isArray: true



            },
            Delete: {
                method: "DELETE",
                url: appsettings.serverPath + "/api/Dashboard/DeleteCourse",

                headers: {

                    'Authorization': authHeader.Authorization
                }


            }




        })

    }
})();



(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('ActivateCoursesFactory', ActivateCoursesFactory)

    ActivateCoursesFactory.$inject = ['$resource', 'appsettings'];

    function ActivateCoursesFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";
        return $resource(appsettings.serverPath + "/api/Dashboard/ActivateCourse", { Crs_Id: "@Crs_Id" }, {

            Activate: {
                url: appsettings.serverPath + "/api/Dashboard/ActivateCourse",
                method: "POST",
                headers: {

                    'Authorization': authHeader.Authorization
                }



            }



        })

    }
})();


(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('ActiveCoursesCategoriesFactory', ActiveCoursesCategoriesFactory)

    ActiveCoursesCategoriesFactory.$inject = ['$resource', 'appsettings'];

    function ActiveCoursesCategoriesFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";



        return $resource(appsettings.serverPath + "/api/Dashboard/ActiveCoursesCategories", {}, {

            query: {

                method: "GET",
                headers: {

                    'Authorization': authHeader.Authorization

                },

                isArray: true


            }


        })
    }
})();



