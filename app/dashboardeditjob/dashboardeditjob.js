(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('EditJobsController', EditJobsController);

    EditJobsController.$inject = ['AddNewJobsFactory', 'toaster', 'ActiveJobsCategoriesFactory', '$route','$http',"appsettings"];
    function EditJobsController(AddNewJobsFactory, toaster, ActiveJobsCategoriesFactory, $route,$http,appsettings) {
        var vm = this;

    $('#txtJobsPhoto')
        .on('filepreupload', function (Jobs, data, previewId, index) {
            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;

            data.jqXHR.success(function (data) {

                $(".file-caption-name").eq(0).val(data);
                vm.Job_Photo = data;
               

            });
        });


  

        vm.JobsCategories = [];


        ActiveJobsCategoriesFactory.query(function (response) {


            vm.JobsCategories = response;

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


            var model = {};
           

            
            if(vm.Job_Photo==null)
            {
               model.Job_Photo="JobsIMG-2.jpeg";
              
            }
            else
            {
               model.Job_Photo = vm.Job_Photo;
              
            }    
           model.Job_Title= vm.Job_Title;
          
           model.Cat_Id = vm.Cat_Id;
           model.Job_Description=vm.Job_Description;
           model.Job_Country=vm.Job_Country;
           model.Job_City=vm.Job_City;
           
           AddNewJobsFactory.Save(model,function (response) {
                
            toaster.pop({
                type: "success",
                title: "SPARK SCHOOL",
                body: response.Job_Title + " Added Successfuly !"

            })

            console.log(response);
        window.location.reload();
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

           
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('AddNewJobsFactory', AddNewJobsFactory)

    AddNewJobsFactory.$inject = ['$resource', 'appsettings'];

    function AddNewJobsFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";     

        return $resource(appsettings.serverPath + "/api/Jobs/NewJobs", {}, {
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
        .factory('ActiveJobsCategoriesFactory', ActiveJobsCategoriesFactory)

    ActiveJobsCategoriesFactory.$inject = ['$resource', 'appsettings'];

    function ActiveJobsCategoriesFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + "/api/Jobs/ActiveJobsCategories", {}, {

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