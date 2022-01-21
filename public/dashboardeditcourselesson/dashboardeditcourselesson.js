
(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('EditCourseLessonController', EditCourseLessonController)

    EditCourseLessonController.$inject = ['EditCourseLessonFactory', 'toaster', '$routeParams', '$location', 'GetCourseLessonNameFactory','CoursesLessonInstructoryFactory','$route'];

    function EditCourseLessonController(EditCourseLessonFactory, toaster, $routeParams, $location, GetCourseLessonNameFactory,CoursesLessonInstructoryFactory,$route) {
        /* jshint validthis:true */
        var vm = this;

       

        vm.CourseLesson = {};

        if ($routeParams.Lesson_Id != null) {

            var entry = new EditCourseLessonFactory();
            entry.Lesson_Id=$routeParams.Lesson_Id;

            EditCourseLessonFactory.Get(entry,function (response) {
                
                vm.Lesson_Name = response.Lesson_Name;
                vm.Lesson_Instructor = response.Lesson_Instructor;
                vm.Lesson_SessionTime = response.Lesson_SessionTime;
                vm.Lesson_Typescript = response.Lesson_Typescript;
                vm.Lesson_Vintro = response.Lesson_Vintro;
                vm.Lesson_VideoFull = response.Lesson_VideoFull;
                vm.Lesson_Photo= response.Lesson_Photo;
                vm.Lesson_Duration = response.Lesson_Duration;
            
           

            },function (response) {
                

                if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {
                    
                    
                                            toaster.pop(
                                                {
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

            vm.Submit = function () {

                var URI = new EditCourseLessonFactory();
               
                URI.Lesson_Name = vm.Lesson_Name;
                URI.Lesson_Instructor = vm.Lesson_Instructor;
                URI.Lesson_SessionTime = vm.Lesson_SessionTime;
                URI.Lesson_Typescript = vm.Lesson_Typescript;
                URI.Lesson_Vintro = vm.Lesson_Vintro.name;
                URI.Lesson_VideoFull = vm.Lesson_VideoFull.name;
                URI.Lesson_Photo = vm.Lesson_Photo.name;
                URI.Lesson_Duration = vm.Lesson_Duration;
                URI.Lesson_Id=$routeParams.Lesson_Id;
               



                EditCourseLessonFactory.Update(URI, function (response) {


                    toaster.pop(
                        {
                            type: "success",
                            title: "SPARK SCHOOL",
                            body: URI.Lesson_Name + " Lesson Edited Successfuly !"
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


                });



            }

           
            var entry = new GetCourseLessonNameFactory();
            entry.Lesson_Id = $routeParams.Lesson_Id;

    


            GetCourseLessonNameFactory.GetCourseLessonName(entry, function (response) {
               
               
                vm.Lesson_Name = response.Lesson_Name;
               

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
        else {


            $location.path("/dashboardnewcourselessons/{{$routeParams.Lesson_Id}}");


        }




    }
})();

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('EditCourseLessonFactory', EditCourseLessonFactory)

    EditCourseLessonFactory.$inject = ['$resource', 'appsettings'];

    function EditCourseLessonFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";

        return $resource(appsettings.serverPath + "/api/Dashboard/EditCourseLesson", {}, {

            Get: {
                method: "GET",
                headers: {

                    'Authorization': authHeader.Authorization
                }


            },
            Update: {
                method: "PUT",
                headers: {

                    'Authorization': authHeader.Authorization
                }


            }




        });


    }
})();

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('GetCourseLessonNameFactory', GetCourseLessonNameFactory)

    GetCourseLessonNameFactory.$inject = ['$resource', 'appsettings'];

    function GetCourseLessonNameFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Dashboard/GetCourseLessonName', {
            Lesson_Id: "@Lesson_Id"
        }, {

            GetCourseLessonName: {

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