
(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('EditCourseGroupController', EditCourseGroupController);

    EditCourseGroupController.$inject = ['GetCourseNameFactory', '$routeParams', 'EditCourseGroupFactory', 'toaster', '$route', 'SessionData','$location'];
    function EditCourseGroupController(GetCourseNameFactory, $routeParams, EditCourseGroupFactory, toaster, $route, SessionData,$location) {
        var vm = this;

        if ($routeParams.Group_Id != null) {





            var Model=new EditCourseGroupFactory();
             Model.Group_Id=$routeParams.Group_Id;
            EditCourseGroupFactory.Get(Model,function (response) {

              
              vm.Group_Name=response.Group_Name;
              vm.Crs_Id=response.AspNetCours.Crs_Id;
              vm.Crs_Name=response.AspNetCours.Crs_Name;
              vm.Group_Instructors=[];
           
              angular.forEach(response.AspNetCourseGroupsInstructors,function (value,key) {
                  
               
                vm.Group_Instructors.push(value.Group_Instructor_Name);

              })


             var Group_Times=[];
              angular.forEach(response.AspNetCourseGroupsTimes,function (value,key) {
                
                 Group_Times.push(value.Group_Time);
                
               
              })

               Group_Times.forEach((element,index) => {
               
                vm.Group_SessionTime1=element[0];
                vm.Group_SessionTime2=element[1];    
                vm.Group_SessionTime3=element[2];
                vm.Group_SessionTime4=element[3];
                vm.Group_SessionTime5=element[4];
                vm.Group_SessionTime6=element[5];
              
             
             

              });
            
              
        
                
            },function (response) {
                
               
                if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                    toaster.pop({
                        type: "error",
                        title: "SPARK SCHOOL",
                        body: response.statusText
                    });

                }

            })

           EditCourseGroupFactory.query({}, function (response) {
                
                
                                vm.ALLInstructors=response;
                            }, function (response) {
                
                               
                                if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {
                                    
                                    
                                                        toaster.pop({
                                                            type: "error",
                                                            title: "SPARK SCHOOL",
                                                            body: response.statusText
                                                        });
                                    
                                                    }
                
                            })
                

            // vm.Submit = function () {

            //     var Group_Times=[];
            //     var Get_Times = [vm.Group_SessionTime1, vm.Group_SessionTime2, vm.Group_SessionTime3,

            //         vm.Group_SessionTime4, vm.Group_SessionTime5, vm.Group_SessionTime6];
            //             for (let index = 0; index < Get_Times.length; index++) {
            //             if (Get_Times[index]!=undefined) {
            //                 Group_Times.push(Get_Times[index]);
            //             }


            //             }

            //     var Group_Instructors = vm.Group_Instructors;

            //     var Model=new NewCourseGroupFactory();
            //     Model.Group_Name=vm.Group_Name;
            //     Model.Crs_Id=$routeParams.Crs_Id;
            //     Model.Group_Times=Group_Times;
            //     Model.Group_Instructors=Group_Instructors;


            //     NewCourseGroupFactory.Save(Model,function (response) {

            //         toaster.pop({
            //             type: "success",
            //             title: "SPARK SCHOOL",
            //             body: response.Group_Name +" Added Successfuly!"
            //         });

            //         $route.reload();

            //     },function (response) {



            //         if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


            //                                 toaster.pop({
            //                                     type: "error",
            //                                     title: "SPARK SCHOOL",
            //                                     body: response.statusText
            //                                 });

            //                             }

            //     })





            // }

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
        .factory('EditCourseGroupFactory', EditCourseGroupFactory);

    EditCourseGroupFactory.$inject = ['$resource', 'appsettings'];
    function EditCourseGroupFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + "/api/Dashboard/EditCourseGroup", { Model: "@Model" }, {

            Save: {
                method: "POST",

                headers: {

                    'Authorization': authHeader.Authorization

                }



            },
            Get: {
                url: appsettings.serverPath + "/api/Dashboard/EditCourseGroup",
                method: "GET",

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
