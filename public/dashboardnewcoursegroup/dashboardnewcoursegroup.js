
(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewCourseGroupController', NewCourseGroupController);

    NewCourseGroupController.$inject = ['GetCourseNameFactory', '$routeParams','NewCourseGroupFactory','toaster','$route'];
    function NewCourseGroupController(GetCourseNameFactory, $routeParams,NewCourseGroupFactory,toaster,$route) {
        var vm = this;

        if ($routeParams.Crs_Id != null) {

            vm.Crs_Id = $routeParams.Crs_Id;

            var entry = new GetCourseNameFactory();
            entry.Crs_Id = $routeParams.Crs_Id;
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


            NewCourseGroupFactory.query({}, function (response) {


                vm.ALLInstructors=response;
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

                var Group_Times=[];
                var Get_Times = [vm.Group_SessionTime1, vm.Group_SessionTime2, vm.Group_SessionTime3,
                
                    vm.Group_SessionTime4, vm.Group_SessionTime5, vm.Group_SessionTime6];
                        for (let index = 0; index < Get_Times.length; index++) {
                        if (Get_Times[index]!=undefined) {
                            Group_Times.push(Get_Times[index]);
                        }
                          
                            
                        }

                var Group_Instructors = vm.Group_Instructors;

                var Model=new NewCourseGroupFactory();
                Model.Group_Name=vm.Group_Name;
                Model.Crs_Id=$routeParams.Crs_Id;
                Model.Group_Times=Group_Times;
                Model.Group_Instructors=Group_Instructors;


                NewCourseGroupFactory.Save(Model,function (response) {

                    toaster.pop({
                        type: "success",
                        title: "SPARK SCHOOL",
                        body: response.Group_Name +" Added Successfuly!"
                    });

                    $route.reload();
                    
                },function (response) {
                    
               

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
        .factory('NewCourseGroupFactory', NewCourseGroupFactory);

    NewCourseGroupFactory.$inject = ['$resource', 'appsettings'];
    function NewCourseGroupFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + "/api/Dashboard/NewCourseGroup", { Model: "@Model" }, {

            Save: {
                method: "POST",

                headers: {

                    'Authorization': authHeader.Authorization

                }



            },
            query:{
                url:appsettings.serverPath + "/api/Dashboard/GetALLInstructors",
                method: "GET",
                
                                headers: {
                
                                    'Authorization': authHeader.Authorization
                
                                },
                                isArray:true
            }




        });


    }
})();
