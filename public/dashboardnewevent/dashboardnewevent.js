

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewEventController', NewEventController);

    NewEventController.$inject = ['AddNewEventFactory', 'toaster', 'ActiveEventsCategoriesFactory', '$route','$http',"appsettings"];
    function NewEventController(AddNewEventFactory, toaster, ActiveEventsCategoriesFactory, $route,$http,appsettings) {
        var vm = this;



    $('#txtEventPhoto')
        .on('filepreupload', function (event, data, previewId, index) {


            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;



            data.jqXHR.success(function (data) {

                $(".file-caption-name").eq(0).val(data);
                vm.Event_Photo = data;
               

            });
        });


  

        vm.EventsCategories = [];


        ActiveEventsCategoriesFactory.query(function (response) {


            vm.EventsCategories = response;

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
       

            
            if(vm.Event_Photo==null)
            {
                URI.Event_Photo="EVENTIMG-2.jpeg";
              
            }
            else
            {
                URI.Event_Photo = vm.Event_Photo;
              
            }    

            


            URI.Event_Title= vm.Event_Title;
          
            URI.Cat_Id = vm.Cat_Id;


            var accessToken = localStorage.getItem("accessToken");
            var authHeader = {};
            authHeader.Authorization = "Bearer " + accessToken;
            authHeader.token_type = "bearer";
            authHeader.content_type = "application/json";     
           
        
            $http({
                url:appsettings.serverPath + "/api/Events/NewEvents",
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
                        body: URI.Event_Title + " Event Added Successfuly !"
                    });
                    location.reload();
          
                
                
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
        .factory('AddNewEventFactory', AddNewEventFactory)

    AddNewEventFactory.$inject = ['$resource', 'appsettings'];

    function AddNewEventFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";     
       


     
       

        return $resource(appsettings.serverPath + "/api/Events/NewEvents", {}, {
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
        .factory('ActiveEventsCategoriesFactory', ActiveEventsCategoriesFactory)

    ActiveEventsCategoriesFactory.$inject = ['$resource', 'appsettings'];

    function ActiveEventsCategoriesFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + "/api/Events/ActiveEventsCategories", {}, {

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