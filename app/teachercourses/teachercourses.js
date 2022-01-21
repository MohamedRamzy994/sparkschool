(function(){
    'use strict';

    angular
        .module('TeacherApp')
        .controller('TeacherCoursesController', TeacherCoursesController)

        TeacherCoursesController.$inject = ['TeacherCoursesFactory','toaster'];

    function TeacherCoursesController(TeacherCoursesFactory,toaster) {
        /* jshint validthis:true */
        var vm = this;
       

        // Pagination Intialization Bootstrap-ui
        vm.totalItems = 0;
        vm.currentPage =1;
        vm.itemsPerPage = 5;
        vm.maxSize = 5; //Number of pager buttons to show
      
        vm.setPage = function (pageNo) {
          vm.currentPage = pageNo;
        };
      
        vm.pageChanged = function() {
        
        };
      
      vm.setItemsPerPage = function(num) {
        vm.itemsPerPage = num;
        vm.currentPage = 1; //reset to first page
      }
      



        TeacherCoursesFactory.GetInstructorCourses(function (response) {
       
            vm.instructorCourses=response;
            vm.totalItems = vm.instructorCourses.length;

           
        },function(response){

        

            if (response.status==400||response.status==500||response.status==502||response.status==401) {
                
               
                toaster.pop(
                    {
                        type:"error",
                        title:"SPARK SCHOOL",
                        body:response.statusText
                    });

            } 
            

        })





    }
})();

(function(){
    'use strict';

    angular
        .module('TeacherApp')
        .factory('TeacherCoursesFactory', TeacherCoursesFactory)

        TeacherCoursesFactory.$inject = ['$resource','appsettings'];

    function TeacherCoursesFactory($resource,appsettings) {
    

        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";

    return $resource(appsettings.serverPath +"/api/Teacher/GetInstructorCourses",{},{

        GetInstructorCourses:{

            method:"GET",
           
                headers:{
                    
                 'Authorization' :authHeader.Authorization
                 },
                 isArray:true
               



           



        }



    })
    
    
    }
})();