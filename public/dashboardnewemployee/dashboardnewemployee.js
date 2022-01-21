(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewEmployeesController', NewEmployeesController);

    NewEmployeesController.$inject = ['AddNewEmployeeFactory', 'toaster', '$route','$http',"appsettings"];
    function NewEmployeesController(AddNewEmployeeFactory, toaster, $route,$http,appsettings) {
        var vm = this;

    $('#txtEmployeesPhoto')
        .on('filepreupload', function (Employee, data, previewId, index) {
            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;

            data.jqXHR.success(function (data) {

                $(".file-caption-name").eq(0).val(data);
                vm.Employee_Photo = data;
               

            });
        });
        vm.Submit = function () {


            var model = {};
           

            
            if(vm.Employee_Photo==null)
            {
               model.Employee_Photo="avatar.jpg";
              
            }
            else
            {
               model.Employee_Photo = vm.Employee_Photo;
              
            }    
           model.Employee_Name= vm.Employee_Name;
           model.Employee_Phone=vm.Employee_Phone;
           model.Employee_Salary=vm.Employee_Salary;


            console.log(model);
           
           AddNewEmployeeFactory.Save(model,function (response) {
                
            toaster.pop({
                type: "success",
                title: "SPARK SCHOOL",
                body: response.Employee_Name + " Added Successfuly !"

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
        .factory('AddNewEmployeeFactory', AddNewEmployeeFactory)

    AddNewEmployeeFactory.$inject = ['$resource', 'appsettings'];

    function AddNewEmployeeFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";     
  
        return $resource(appsettings.serverPath + "/api/Employees/NewEmployee", {}, {
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