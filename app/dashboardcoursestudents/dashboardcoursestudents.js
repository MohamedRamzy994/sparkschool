
(function() {
    'use strict';

    angular
        .module('DashboardApp')
        .controller('CourseStudentsController', CourseStudentsController);

    CourseStudentsController.$inject = ['GetCourseNameFactory','$routeParams'];
    function CourseStudentsController(GetCourseNameFactory,$routeParams) {
        var vm = this;

        if ($routeParams.Crs_Id != null) {

            var entry=new GetCourseNameFactory();
            entry.Crs_Id=$routeParams.Crs_Id ;
        GetCourseNameFactory.GetCourseName(entry, function (response) {
            
            
                            vm.Crs_Name = response.Crs_Name;
            
                        }, function (response) {
            
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
