(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('ProgrameCoursesController', ProgrameCoursesController);

    ProgrameCoursesController.$inject = ['AddNewProgrameCourseFactory', 'toaster', 'CoursesLessonInstructoryFactory', '$route', 'GetProgrameNameFactory', '$routeParams', '$location', 'GetProgrameCoursesFactory', 'DeleteProgrameCoursesFactory', '$ngConfirm', 'ActivateProgrameCourseFactory'];

    function ProgrameCoursesController(AddNewProgrameCourseFactory, toaster, CoursesLessonInstructoryFactory, $route, GetProgrameNameFactory, $routeParams, $location, GetProgrameCoursesFactory, DeleteProgrameCoursesFactory, $ngConfirm, ActivateProgrameCourseFactory) {

        var vm = this;

        $('#txtLessonVIntro')
            .on('filepreupload', function (event, data, previewId, index) {


                var form = data.form,
                    files = data.files,
                    extra = data.extra,
                    response = data.response,
                    reader = data.reader;



                data.jqXHR.success(function (data) {

                    $(".file-caption-name").eq(1).val(data);


                    vm.Lesson_Vintro = data;

                   



                });
            });

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


        vm.Programe_Name= "";
        if ($routeParams.Programe_Id != null) {
          

            vm.Programe_Id=$routeParams.Programe_Id;
            var entry = new GetProgrameNameFactory();
            entry.Programe_Id = $routeParams.Programe_Id;

          




            GetProgrameNameFactory.GetProgrameName(entry, function (response) {
               
        
                vm.Programe_Name = response.Programe_Name;

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


            var entry = new GetProgrameCoursesFactory();

            entry.Programe_Id = $routeParams.Programe_Id;

            GetProgrameCoursesFactory.query(entry, function (response) {

                vm.Courses = response;

               
            


            }, function (response) {

                if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                    toaster.pop({
                        type: "error",
                        title: "SPARK SCHOOL",
                        body: response.statusText
                    });

                }

            })


            vm.Confirm = function (Crs_Id) {


                $ngConfirm({
                    title: 'Confirm!',
                    content: '<strong>Do you want to Delete Course ?</strong>',
                    buttons: {
                        Delete: {
                            text: 'Yes Sure',
                            btnClass: 'btn-blue',
                            action: function () {

                                var entry = new DeleteProgrameCoursesFactory();
                                entry.Crs_Id = Crs_Id;



                                DeleteProgrameCoursesFactory.Delete(entry, function (response) {
                                    toaster.pop({
                                        type: "success",
                                        title: "SPARK SCHOOL",
                                        body: response.Crs_Name + " Course  Deleted Successfuly !"
                                    });

                                    $route.reload();

                                }, function (response) {
                                    console.log(response);
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


            vm.Activate = function (Crs_Id) {

                var entry = new ActivateProgrameCourseFactory();
                entry.Crs_Id = Crs_Id;

                ActivateProgrameCourseFactory.Activate(entry, function (response) {

                    toaster.pop({
                        type: "success",
                        title: "SPARK SCHOOL",
                        body: response.Crs_Name + "Course Activated Successfuly !"
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

            $location.path("/dashboardprogramecourses");

        }




    }
})();

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('AddNewProgrameCourseFactory', AddNewProgrameCourseFactory)

    AddNewProgrameCourseFactory.$inject = ['$resource', 'appsettings'];

    function AddNewProgrameCourseFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";

        var accessToken = localStorage.getItem("accessToken");


        return $resource(appsettings.serverPath + "/api/Dashboard/NewProgrameCourse", {}, {
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
        .factory('GetProgrameNameFactory', GetProgrameNameFactory)

    GetProgrameNameFactory.$inject = ['$resource', 'appsettings'];

    function GetProgrameNameFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Programes/GetProgrameName', {
            Programe_Id: "@Programe_Id"
        }, {

            GetProgrameName: {

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
        .factory('GetProgrameCoursesFactory', GetProgrameCoursesFactory)

    GetProgrameCoursesFactory.$inject = ['$resource', 'appsettings'];

    function GetProgrameCoursesFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Programes/GetProgrameCourses', {
            Programe_Id: "@Programe_Id"
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
        .factory('DeleteProgrameCoursesFactory', DeleteProgrameCoursesFactory)

    DeleteProgrameCoursesFactory.$inject = ['$resource', 'appsettings'];

    function DeleteProgrameCoursesFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Programes/DeleteProgrameCourses', {

            Crs_Id: "@Crs_Id"
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
        .factory('ActivateProgrameCourseFactory', ActivateProgrameCourseFactory)

    ActivateProgrameCourseFactory.$inject = ['$resource', 'appsettings'];

    function ActivateProgrameCourseFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Programes/ActivateProgrameCourse', {

            Crs_Id: "@Crs_Id"
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