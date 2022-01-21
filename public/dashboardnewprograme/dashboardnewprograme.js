

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewProgrameController', NewProgrameController);

    NewProgrameController.$inject = ['AddNewProgrameFactory', 'toaster', 'ActiveProgramesCategoriesFactory', '$route','$http',"appsettings"];
    function NewProgrameController(AddNewProgrameFactory, toaster, ActiveProgramesCategoriesFactory, $route,$http,appsettings) {
        var vm = this;



    $('#txtProgramePhoto')
        .on('filepreupload', function (event, data, previewId, index) {


            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;



            data.jqXHR.success(function (data) {

                $(".file-caption-name").eq(0).val(data);
                vm.Programe_Photo = data;
               

            });
        });


  

        vm.ProgramesCategories = [];


        ActiveProgramesCategoriesFactory.query(function (response) {


            vm.ProgramesCategories = response;

        }, function (response) {

            console.log(response);
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
            URI.Programe_Price = vm.Programe_Price;

            
            if(vm.Programe_Photo==null)
            {
                URI.Programe_Photo="2.jpeg";
              
            }
            else
            {
                URI.Programe_Photo = vm.Programe_Photo;
              
            }    

            

            URI.Programe_NumCourses = vm.Programe_NumCourses;
            URI.Programe_Name = vm.Programe_Name;
            URI.Programe_StartDateTime = vm.Programe_StartDateTime;
            URI.Programe_Duration = vm.Programe_Duration;
            URI.Programe_Description = vm.Programe_Description;
            URI.Cat_Id = vm.Cat_Id;

            console.log(URI);


            AddNewProgrameFactory.Save(URI,function (response) {
                toaster.pop({
                    type: "success",
                    title: "SPARK SCHOOL",
                    body: response.Programe_Name + " Programe Added Successfuly !"
                });
                $route.reload();

            },function (response) {
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
    }
})();

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('AddNewProgrameFactory', AddNewProgrameFactory)

    AddNewProgrameFactory.$inject = ['$resource', 'appsettings'];

    function AddNewProgrameFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";     
       


     
       

        return $resource(appsettings.serverPath + "/api/Programes/NewPrograme", {}, {
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
        .factory('ActiveProgramesCategoriesFactory', ActiveProgramesCategoriesFactory)

    ActiveProgramesCategoriesFactory.$inject = ['$resource', 'appsettings'];

    function ActiveProgramesCategoriesFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + "/api/Programes/ActiveProgramesCategories", {}, {

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
