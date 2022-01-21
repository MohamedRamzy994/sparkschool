(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewProgrameCourseGroupController', NewProgrameCourseGroupController);

    NewProgrameCourseGroupController.$inject = ['GetProgrameCourseNameFactory', '$routeParams', 'NewProgrameCourseGroupFactory', 'toaster', '$route'];

    function NewProgrameCourseGroupController(GetProgrameCourseNameFactory, $routeParams, NewProgrameCourseGroupFactory, toaster, $route) {
        var vm = this;

        if ($routeParams.Crs_Id != null) {

            vm.Crs_Id = $routeParams.Crs_Id;

            var entry = new GetProgrameCourseNameFactory();
            entry.Crs_Id = $routeParams.Crs_Id;
            GetProgrameCourseNameFactory.GetProgrameCourseName(entry, function (response) {




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


            NewProgrameCourseGroupFactory.query({}, function (response) {


                vm.ALLInstructors = response;
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


            vm.Submit = function () {
             

                var Group_Times = [];
                var Get_Times = [vm.Group_SessionTime1, vm.Group_SessionTime2, vm.Group_SessionTime3,

                    vm.Group_SessionTime4, vm.Group_SessionTime5, vm.Group_SessionTime6
                ];
                for (let index = 0; index < Get_Times.length; index++) {
                    if (Get_Times[index] != undefined) {
                        Group_Times.push(Get_Times[index]);
                    }


                }

                var Group_Instructors = vm.Group_Instructors;

                var Model = new NewProgrameCourseGroupFactory();
                Model.Group_Name = vm.Group_Name;
                Model.Crs_Id = $routeParams.Crs_Id;
                Model.Group_Times = Group_Times;
                Model.Group_Instructors = Group_Instructors;



                NewProgrameCourseGroupFactory.Save(Model, function (response) {

                    toaster.pop({
                        type: "success",
                        title: "SPARK SCHOOL",
                        body: response.Group_Name + " Added Successfuly!"
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

        }
    }
})();



(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('GetProgrameCourseNameFactory', GetProgrameCourseNameFactory)

    GetProgrameCourseNameFactory.$inject = ['$resource', 'appsettings'];

    function GetProgrameCourseNameFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Programes/GetProgrameCourseName', {
            Crs_Id: "@Crs_Id"
        }, {

            GetProgrameCourseName: {

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
        .factory('NewProgrameCourseGroupFactory', NewProgrameCourseGroupFactory);

    NewProgrameCourseGroupFactory.$inject = ['$resource', 'appsettings'];

    function NewProgrameCourseGroupFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + "/api/Programes/NewProgrameCourseGroup", {
            Model: "@Model"
        }, {

            Save: {
                method: "POST",

                headers: {

                    'Authorization': authHeader.Authorization

                }



            },
            query: {
                url: appsettings.serverPath + "/api/Dashboard/GetALLInstructors",
                method: "GET",

                headers: {

                    'Authorization': authHeader.Authorization

                },
                isArray: true
            }




        });


    }
})();
