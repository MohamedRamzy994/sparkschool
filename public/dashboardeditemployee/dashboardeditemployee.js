(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('EditEmployeesController', EditEmployeesController);

    EditEmployeesController.$inject = ['EditEmployeeFactory', 'toaster', '$route','$http',"appsettings","$routeParams"];
    function EditEmployeesController(EditEmployeeFactory, toaster, $route,$http,appsettings,$routeParams) {
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


        if ($routeParams.Employee_Id != null) {

            var entry = new EditEmployeeFactory();
            entry.Employee_Id=$routeParams.Employee_Id;

            EditEmployeeFactory.Get(entry,function (response) {
                
                vm.Employee_Name = response.Employee_Name;
                vm.Employee_Phone = response.Employee_Phone;
                vm.Employee_Photo = response.Employee_Photo;
                vm.Employee_Salary = response.Employee_Salary;
               
            
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
        }


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
           
           EditEmployeeFactory.Save(model,function (response) {
                
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
        .factory('EditEmployeeFactory', EditEmployeeFactory)

    EditEmployeeFactory.$inject = ['$resource', 'appsettings'];

    function EditEmployeeFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";     
  
        return $resource(appsettings.serverPath + "/api/Employees/EditEmployee", {Employee_Id:"@Employee_Id"}, {
            Save: {
                method: 'POST',
                headers: {

                 'Authorization': authHeader.Authorization


                }
            },
                Get: {
                    method: "GET",
                    headers: {
    
                        'Authorization': authHeader.Authorization
                    }
    
    
                }


            }
        );


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