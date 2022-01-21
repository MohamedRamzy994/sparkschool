(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('CourseLessonsController', CourseLessonsController);

    CourseLessonsController.$inject = ['AddNewCourseLessonFactory', 'toaster', 'CoursesLessonInstructoryFactory', '$route', 'GetCourseNameFactory', '$routeParams', '$location', 'GetCourseLessonsFactory', 'DeleteCourseLessonsFactory', '$ngConfirm', 'ActivateCourseLessonFactory'];

    function CourseLessonsController(AddNewCourseLessonFactory, toaster, CoursesLessonInstructoryFactory, $route, GetCourseNameFactory, $routeParams, $location, GetCourseLessonsFactory, DeleteCourseLessonsFactory, $ngConfirm, ActivateCourseLessonFactory) {

        var vm = this;

     

        $('#txtLessonPhoto')
            .on('filepreupload', function (event, data, previewId, index) {


                var form = data.form,
                    files = data.files,
                    extra = data.extra,
                    response = data.response,
                    reader = data.reader;



                data.jqXHR.success(function (data) {

                    $(".file-caption-name").eq(0).val(data);
                    vm.Lesson_Photo = data;

                });
            });


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


        vm.Crs_Name = "";
        if ($routeParams.Crs_Id != null) {

            var entry = new GetCourseNameFactory();
            entry.Crs_Id = $routeParams.Crs_Id;

            vm.Crs_Id=$routeParams.Crs_Id;


            GetCourseNameFactory.GetCourseName(entry, function (response) {


                vm.Crs_Name = response.Crs_Name;

            }, function (response) {

                if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                    toaster.pop({
                        type: "error",
                        title: "SPARK SCHOOL",
                        body: response.statusText
                    });

                }


            })


            CoursesLessonInstructoryFactory.query(function (response) {

                vm.CoursesInstructories = response;



            }, function (response) {




                if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                    toaster.pop({
                        type: "error",
                        title: "SPARK SCHOOL",
                        body: response.statusText
                    });

                }




            });


            GetCourseLessonsFactory.query({
                Crs_Id: $routeParams.Crs_Id
            }, function (response) {

                vm.CourseLessons = response;
                vm.totalItems = vm.CourseLessons.length;


            }, function (response) {

                console.log(response);

                if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                    toaster.pop({
                        type: "error",
                        title: "SPARK SCHOOL",
                        body: response.statusText
                    });

                }




            });


            vm.Submit = function () {





                var URI = new AddNewCourseLessonFactory();

                URI.Lesson_Name = vm.Lesson_Name;
                URI.Lesson_Instructor = vm.Lesson_Instructor;
                URI.Lesson_SessionTime = vm.Lesson_SessionTime;
                URI.Lesson_Typescript = vm.Lesson_Typescript;

             
                if(vm.Lesson_Photo==null)
                {
                    URI.Lesson_Photo="LessonIMG_2.jpeg";
                }
                else
                {
                    URI.Lesson_Photo = vm.Lesson_Photo;
    
                } 

            
                URI.Lesson_Duration = vm.Lesson_Duration;
                URI.Crs_Id = $routeParams.Crs_Id;



                AddNewCourseLessonFactory.Save(URI, function (response) {

                    toaster.pop({
                        type: "success",
                        title: "SPARK SCHOOL",
                        body: URI.Lesson_Name + " Lesson Added Successfuly !"
                    });

                    window.location.reload();





                }, function (response) {

                    console.log(response);

                    if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                        toaster.pop({
                            type: "error",
                            title: "SPARK SCHOOL",
                            body: response.statusText
                        });

                    }


                })

            }

            var entry = new GetCourseLessonsFactory();

            entry.Crs_Id = $routeParams.Crs_Id;

            GetCourseLessonsFactory.query(entry, function (response) {

                vm.CourseLessons = response;


            }, function (response) {

                if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                    toaster.pop({
                        type: "error",
                        title: "SPARK SCHOOL",
                        body: response.statusText
                    });

                }

            })


            vm.Confirm = function (Lesson_Id) {


                $ngConfirm({
                    title: 'Confirm!',
                    content: '<strong>Do you want to Delete Lesson ?</strong>',
                    buttons: {
                        Delete: {
                            text: 'Yes Sure',
                            btnClass: 'btn-blue',
                            action: function () {

                                var entry = new DeleteCourseLessonsFactory();
                                entry.Lesson_Id = Lesson_Id;



                                DeleteCourseLessonsFactory.Delete(entry, function (response) {
                                    toaster.pop({
                                        type: "success",
                                        title: "SPARK SCHOOL",
                                        body: response.Lesson_Name + " Lesson  Deleted Successfuly !"
                                    });

                                    $route.reload();

                                }, function (response) {
                                    if (response.status == 400 || response.status == 405 || response.status == 500 || response.status == 502 || response.status == 401) {


                                        toaster.pop({
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


            vm.Activate = function (Lesson_Id) {

                var entry = new ActivateCourseLessonFactory();
                entry.Lesson_Id = Lesson_Id;

                ActivateCourseLessonFactory.Activate(entry, function (response) {

                    toaster.pop({
                        type: "success",
                        title: "SPARK SCHOOL",
                        body: response.Lesson_Name + "Lesson Activated Successfuly !"
                    });
                    $route.reload();



                }, function (response) {
                    if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                        toaster.pop({
                            type: "error",
                            title: "SPARK SCHOOL",
                            body: response.statusText
                        });

                    }



                })



            }


        } else {

            $location.path("/dashboardcourseslessons");

        }




    }
})();

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('AddNewCourseLessonFactory', AddNewCourseLessonFactory)

    AddNewCourseLessonFactory.$inject = ['$resource', 'appsettings'];

    function AddNewCourseLessonFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";

        var accessToken = localStorage.getItem("accessToken");


        return $resource(appsettings.serverPath + "/api/Dashboard/NewCourseLesson", {}, {
            Save: {
                method: 'POST',
                headers: {

                    'Authorization': authHeader.Authorization


                }


            }

        });


    }
})();

(function () {
    'use strict';
    angular.module("DashboardApp")
        .directive('ckEditor', function () {
            return {
                require: '?ngModel',
                link: function (scope, elm, attr, ngModel) {
                    var ck = CKEDITOR.replace(elm[0]);
                    if (!ngModel) return;
                    ck.on('instanceReady', function () {
                        ck.setData(ngModel.$viewValue);
                    });

                    function updateModel() {
                        scope.$apply(function () {
                            ngModel.$setViewValue(ck.getData());
                        });
                    }
                    ck.on('change', updateModel);
                    ck.on('key', updateModel);
                    ck.on('dataReady', updateModel);

                    ngModel.$render = function (value) {
                        ck.setData(ngModel.$viewValue);
                    };
                }
            };
        });

})();


(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('CoursesLessonInstructoryFactory', CoursesLessonInstructoryFactory)

    CoursesLessonInstructoryFactory.$inject = ['$resource', 'appsettings'];

    function CoursesLessonInstructoryFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + "/api/Dashboard/GetALLInstructors", {}, {

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

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('GetCourseNameFactory', GetCourseNameFactory)

    GetCourseNameFactory.$inject = ['$resource', 'appsettings'];

    function GetCourseNameFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Dashboard/GetCourseName', {
            Crs_Id: "@Crs_Id"
        }, {

            GetCourseName: {

                method: "GET",
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
        .factory('GetCourseLessonsFactory', GetCourseLessonsFactory)

    GetCourseLessonsFactory.$inject = ['$resource', 'appsettings'];

    function GetCourseLessonsFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Dashboard/GetCourseLessons', {
            Crs_Id: "@Crs_Id"
        }, {

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


(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('DeleteCourseLessonsFactory', DeleteCourseLessonsFactory)

    DeleteCourseLessonsFactory.$inject = ['$resource', 'appsettings'];

    function DeleteCourseLessonsFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Dashboard/DeleteCourseLessons', {

            Lesson_Id: "@Lesson_Id"
        }, {

            Delete: {

                method: "DELETE",
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
        .factory('ActivateCourseLessonFactory', ActivateCourseLessonFactory)

    ActivateCourseLessonFactory.$inject = ['$resource', 'appsettings'];

    function ActivateCourseLessonFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Dashboard/ActivateCourseLesson', {

            Lesson_Id: "@Lesson_Id"
        }, {

            Activate: {

                method: "POST",
                headers: {

                    'Authorization': authHeader.Authorization

                }



            }


        })


    }
})();