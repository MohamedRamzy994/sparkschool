(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewNewsController', NewNewsController);

    NewNewsController.$inject = ['AddNewNewsFactory', 'toaster', 'ActiveNewsCategoriesFactory', '$route','$http',"appsettings"];
    function NewNewsController(AddNewNewsFactory, toaster, ActiveNewsCategoriesFactory, $route,$http,appsettings) {
        var vm = this;

    $('#txtNewsPhoto')
        .on('filepreupload', function (News, data, previewId, index) {
            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;

            data.jqXHR.success(function (data) {

                $(".file-caption-name").eq(0).val(data);
                vm.News_Photo = data;
               

            });
        });


  

        vm.NewsCategories = [];


        ActiveNewsCategoriesFactory.query(function (response) {


            vm.NewsCategories = response;

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
           

            
            if(vm.News_Photo==null)
            {
               model.News_Photo="CRSIMG-2.jpeg";
              
            }
            else
            {
               model.News_Photo = vm.News_Photo;
              
            }    
           model.News_Title= vm.News_Title;
          
           model.Cat_Id = vm.Cat_Id;
           model.News_Description=vm.News_Description;
           model.News_Content=vm.News_Content;

            console.log(model);
           
           AddNewNewsFactory.Save(model,function (response) {
                
            toaster.pop({
                type: "success",
                title: "SPARK SCHOOL",
                body: response.News_Title + " Added Successfuly !"

            })

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
        .factory('AddNewNewsFactory', AddNewNewsFactory)

    AddNewNewsFactory.$inject = ['$resource', 'appsettings'];

    function AddNewNewsFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";     
       


     
       

        return $resource(appsettings.serverPath + "/api/News/NewNews", {}, {
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
        .factory('ActiveNewsCategoriesFactory', ActiveNewsCategoriesFactory)

    ActiveNewsCategoriesFactory.$inject = ['$resource', 'appsettings'];

    function ActiveNewsCategoriesFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + "/api/News/ActiveNewsCategories", {}, {

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