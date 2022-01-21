

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewCourseController', NewCourseController);

    NewCourseController.$inject = ['AddNewCourseFactory', 'toaster', 'ActiveCoursesCategoriesFactory', '$route','$http',"appsettings"];
    function NewCourseController(AddNewCourseFactory, toaster, ActiveCoursesCategoriesFactory, $route,$http,appsettings) {
        var vm = this;



    $('#txtCrsPhoto')
        .on('filepreupload', function (event, data, previewId, index) {


            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;



            data.jqXHR.success(function (data) {

                $(".file-caption-name").eq(0).val(data);
                vm.Crs_Photo = data;
               

            });
        });

        $('#txtCourseVideo')
        .on('filepreupload', function (event, data, previewId, index) {


            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;



            data.jqXHR.success(function (data) {

                $(".file-caption-name").eq(1).val(data);


                vm.Crs_Video = data;

               



            });
        });
  

        vm.CoursesCategories = [];


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


        vm.Submit = function () {


            var URI = {};
            URI.Crs_Price = vm.Crs_Price;

            
            if(vm.Crs_Photo==null)
            {
                URI.Crs_Photo="2.jpeg";
              
            }
            else
            {
                URI.Crs_Photo = vm.Crs_Photo;
              
            }    
            if(vm.Crs_Video==null)
            {
                URI.Crs_Video="CrsVideo.mp4";
              
            }
            else
            {
                URI.Crs_Video = vm.Crs_Video;
              
            }   

            

            URI.Crs_Numlessons = vm.Crs_Numlessons;
            URI.Crs_Name = vm.Crs_Name;
            URI.Crs_Level = vm.Crs_Level;
            URI.Crs_Duration = vm.Crs_Duration;
            URI.Crs_Description = vm.Crs_Description;
            URI.CrsCats_Id = vm.CrsCats_Id;
            


            var accessToken = localStorage.getItem("accessToken");
            var authHeader = {};
            authHeader.Authorization = "Bearer " + accessToken;
            authHeader.token_type = "bearer";
            authHeader.content_type = "application/json";     
           
            
            
            // var getModelAsFormData = function (data) {
            //     var dataAsFormData = new FormData();
            //     angular.forEach(data, function (value, key) {
            //         dataAsFormData.append(key, value);
                    
            //     });

            //    return dataAsFormData;
            // }
            $http({
                url:appsettings.serverPath + "/api/Dashboard/NewCourse",
                method: 'POST',
                headers: {

                    'Authorization': authHeader.Authorization,
                  
                  
                

                },
                data:JSON.stringify(URI),
                transformRequest: angular.identity
               


            }).then(function (response) {

                toaster.pop(
                    {
                        type: "success",
                        title: "SPARK SCHOOL",
                        body: URI.Crs_Name + " Course Added Successfuly !"
                    });
                    location.reload();
                console.log(response);
                
                
            },function (response) {
                console.log(response);
                
                                if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {
                
                
                                    toaster.pop(
                                        {
                                            type: "error",
                                            title: "SPARK SCHOOL",
                                            body: response.statusText
                                        });
                
                                }
                
                    
            })

            // var getModelAsFormData = function (data) {
            //     var dataAsFormData = new FormData();
            //     angular.forEach(data, function (value, key) {
            //         if (key == "Crs_Photo") {
            //             console.log(value);
            //             for (var i = 0; i < value.length; i++) {
            //                 dataAsFormData.append(value[i].name, value[i]);
            //             }
            //         } else {
            //             dataAsFormData.append(key, value);
            //         }
            //     });

        
            //     return dataAsFormData;
        
            // };
        
    

           
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('AddNewCourseFactory', AddNewCourseFactory)

    AddNewCourseFactory.$inject = ['$resource', 'appsettings'];

    function AddNewCourseFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";     
       


     
       

        return $resource(appsettings.serverPath + "/api/Dashboard/NewCourse", {}, {
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