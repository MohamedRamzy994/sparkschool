(function(){
    'use strict';

    angular
        .module('TeacherApp')
        .controller('TeacherIndexController', TeacherIndexController)

        TeacherIndexController.$inject = ['TeacherIndexFactory','toaster'];

    function TeacherIndexController(TeacherIndexFactory,toaster) {
        /* jshint validthis:true */
        var vm = this;
       

        TeacherIndexFactory.GetInstructorInfo(function (response) {
            console.info(response);
            vm.instructorInfo=response;

           
        },function(response){

            console.info(response);

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
        .factory('TeacherIndexFactory', TeacherIndexFactory)

        TeacherIndexFactory.$inject = ['$resource','appsettings'];

    function TeacherIndexFactory($resource,appsettings) {
    

        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";

    return $resource(appsettings.serverPath +"/api/Teacher/InstructorInfo",{},{

        GetInstructorInfo:{

            method:"GET",
           
                headers:{
                    
                 'Authorization' :authHeader.Authorization
                 }
               



           



        }



    })
    
    
    }
})();