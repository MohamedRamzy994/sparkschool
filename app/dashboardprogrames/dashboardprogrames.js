

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('ProgramesController', ProgramesController)

    ProgramesController.$inject = ['ProgramesFactory', 'toaster', "ActivateProgramesFactory", "$route", "$ngConfirm", "ActiveProgramesCategoriesFactory"];

    function ProgramesController(ProgramesFactory, toaster, ActivateProgramesFactory, $route, $ngConfirm, ActiveProgramesCategoriesFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.Programes = [];
        vm.ProgramesCategories = [];



        // Pagination Intialization Bootstrap-ui
        vm.totalItems = 0;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.maxSize = 5; //Number of pager buttons to show

        vm.setPage = function (pageNo) {
            vm.currentPage = pageNo;
        };

        vm.pageChanged = function () {

        };

        vm.setItemsPerPage = function (num) {
            vm.itemsPerPage = num;
            vm.currentPage = 1; //reset to first page
        }

        ActiveProgramesCategoriesFactory.query(function (response) {



            vm.ProgramesCategories = response;

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



        ProgramesFactory.Get(function (response) {

            

            vm.Programes = response;
            vm.totalItems = vm.Programes.length;


        }, function (response) {


            if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                toaster.pop(
                    {
                        type: "error",
                        title: "SPARK SCHOOL",
                        body: response.statusText
                    });

            }




        })

        vm.Activate = function (Crs_Id) {

            var entry = new ActivateProgramesFactory();

            entry.Crs_Id = Crs_Id;
            ActivateProgramesFactory.Activate(entry, function (response) {
                toaster.pop(
                    {
                        type: "success",
                        title: "SPARK SCHOOL",
                        body: response.Crs_Name + "Programe Activated Successfuly !"
                    });
                $route.reload();



            }, function (response) {

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


        vm.Confirm = function (Crs_Id) {

            vm.Crs_Id = Crs_Id;
            $ngConfirm({
                title: 'Confirm!',
                content: '<strong>Do you want to Delete Programe ?</strong>',
                buttons: {
                    Delete: {
                        text: 'Yes Sure',
                        btnClass: 'btn-blue',
                        action: function () {

                            var entry = new ProgramesFactory();
                            entry.Crs_Id = vm.Crs_Id;


                            ProgramesFactory.Delete(entry, function (response) {
                                toaster.pop(
                                    {
                                        type: "success",
                                        title: "SPARK SCHOOL",
                                        body: response.Crs_Name + " Programe Deleted Successfuly !"
                                    });

                                $route.reload();

                            }, function (response) {
                                if (response.status == 400 || response.status == 405 || response.status == 500 || response.status == 502 || response.status == 401) {


                                    toaster.pop(
                                        {
                                            type: "error",
                                            title: "SPARK SCHOOL",
                                            body: response.statusText
                                        });

                                }

                            })


                        }
                    },

                    close: function (scope, button) {
                        // closes the modal
                    },
                }
            });

        }



    }
})();

(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('ProgramesFactory', ProgramesFactory)

    ProgramesFactory.$inject = ['$resource', 'appsettings'];

    function ProgramesFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;


        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";

        return $resource(appsettings.serverPath + '/api/Programes/Programes', {}, {

            Get: {
                method: "GET",


                headers: {

                    'Authorization': authHeader.Authorization

                },
                isArray: true



            },
            Delete: {
                method: "DELETE",
                url: appsettings.serverPath + "/api/Programes/DeletePrograme",

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
        .factory('ActivateProgramesFactory', ActivateProgramesFactory)

    ActivateProgramesFactory.$inject = ['$resource', 'appsettings'];

    function ActivateProgramesFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";
        return $resource(appsettings.serverPath + "/api/Programes/ActivatePrograme", { Crs_Id: "@Crs_Id" }, {

            Activate: {
                url: appsettings.serverPath + "/api/Programes/ActivatePrograme",
                method: "POST",
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



