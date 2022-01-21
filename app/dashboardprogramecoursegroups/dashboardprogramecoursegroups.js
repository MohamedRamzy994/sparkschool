
(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('ProgrameCourseGroupsController', ProgrameCourseGroupsController);

        ProgrameCourseGroupsController.$inject = ['GetProgrameCourseGroupsFactory', 'GetProgrameCourseNameFactory', 'ActivateProgrameCourseGroupFactory', '$routeParams', '$http', 'appsettings', 'toaster', '$route', '$ngConfirm','SessionData'];
    function ProgrameCourseGroupsController(GetProgrameCourseGroupsFactory, GetProgrameCourseNameFactory, ActivateProgrameCourseGroupFactory, $routeParams, $http, appsettings, toaster, $route, $ngConfirm,SessionData) {
        var vm = this;


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

        if ($routeParams.Crs_Id != null) {

            vm.Crs_Id = $routeParams.Crs_Id;

           

            var entry = new GetProgrameCourseNameFactory();
            entry.Crs_Id = $routeParams.Crs_Id;
            GetProgrameCourseNameFactory.GetProgrameCourseName(entry, function (response) {


                vm.Crs_Name = response.Crs_Name;

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
            var entry = new GetProgrameCourseGroupsFactory();
            entry.Crs_Id = $routeParams.Crs_Id;
            GetProgrameCourseGroupsFactory.query(entry, function (response) {

                vm.Groups = response;
                vm.totalItems = response.length;




            }, function (response) {

                if (response.status == 400 || response.status == 500 || response.status == 502 || response.status == 401) {


                    toaster.pop({
                        type: "error",
                        title: "SPARK SCHOOL",
                        body: response.statusText
                    });

                }


            })



            vm.Activate = function (Group_Id) {

                var entry = new ActivateProgrameCourseGroupFactory();

                entry.Group_Id = Group_Id;
                ActivateProgrameCourseGroupFactory.Activate(entry, function (response) {
                    toaster.pop(
                        {
                            type: "success",
                            title: "SPARK SCHOOL",
                            body: response.Group_Name + "Group Activated Successfuly !"
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



        }



        vm.Confirm = function (Group_Id) {

            vm.Group_Id = Group_Id;
            $ngConfirm({
                title: 'Confirm!',
                content: '<strong>Do you want to Delete Group ?</strong>',
                buttons: {
                    Delete: {
                        text: 'Yes Sure',
                        btnClass: 'btn-blue',
                        action: function () {

                            var entry = new GetProgrameCourseGroupsFactory();
                            entry.Group_Id = vm.Group_Id;


                            GetProgrameCourseGroupsFactory.Delete(entry, function (response) {
                                toaster.pop(
                                    {
                                        type: "success",
                                        title: "SPARK SCHOOL",
                                        body: response.Group_Name + " Group Deleted Successfuly !"
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
        .factory('GetProgrameCourseNameFactory', GetProgrameCourseNameFactory)

    GetProgrameCourseNameFactory.$inject = ['$resource', 'appsettings'];

    function GetProgrameCourseNameFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Programes/GetProgrameCourseName', {
     
        }, {

                GetProgrameCourseName: {

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
        .factory('GetProgrameCourseGroupsFactory', GetProgrameCourseGroupsFactory)

    GetProgrameCourseGroupsFactory.$inject = ['$resource', 'appsettings'];

    function GetProgrameCourseGroupsFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";


        return $resource(appsettings.serverPath + '/api/Programes/GetProgrameCourseGroups', {
            Group_Id: "@Group_Id"
        }, {

                query: {

                    method: "GET",
                    headers: {

                        'Authorization': authHeader.Authorization

                    },
                    isArray: true


                },
                Delete: {
                    method: "DELETE",
                    url: appsettings.serverPath + "/api/Programes/DeleteProgrameCourseGroup",

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
        .filter('DistinctFilter', DistinctFilter)

    function DistinctFilter() {

        // we will return a function which will take in a collection
        // and a keyname
        return function (collection, keyname) {
            // we define our output and keys array;
            var output = [];
            var keys = [];

            // we utilize angular's foreach function
            // this takes in our original collection and an iterator function
            angular.forEach(collection, function (item) {




            });
            // return our array which should be devoid of
            // any duplicates
            return output;
        }
    }

}());



(function () {
    'use strict';

    angular
        .module('DashboardApp')
        .factory('ActivateProgrameCourseGroupFactory', ActivateProgrameCourseGroupFactory)

    ActivateProgrameCourseGroupFactory.$inject = ['$resource', 'appsettings'];

    function ActivateProgrameCourseGroupFactory($resource, appsettings) {

        var accessToken = localStorage.getItem("accessToken");
        var authHeader = {};
        authHeader.Authorization = "Bearer " + accessToken;
        authHeader.token_type = "bearer";
        authHeader.content_type = "application/json";
        return $resource(appsettings.serverPath + "/api/Programes/ActiveProgrameCoursesGroupsFactory", { Group_Id: "@Group_Id" }, {

            Activate: {
                url: appsettings.serverPath + "/api/Programes/ActiveProgrameCoursesGroupsFactory",
                method: "POST",
                headers: {

                    'Authorization': authHeader.Authorization
                }



            }



        })

    }
})();

(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .factory('SessionData', SessionData)
    function SessionData() {
        var SaveData={};
        function set(sharedData) {
            
            SaveData=sharedData;
        }

        function get(sharedData) {
            
            return SaveData;
        }

        return{

            set:set,
            get:get
        }
    }
})();

