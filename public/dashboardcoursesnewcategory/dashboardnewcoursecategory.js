(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewCoursesCategoryController',NewCoursesCategoryController)

        NewCoursesCategoryController.$inject = ['NewCoursesCategoryFactory','toaster'];

    function NewCoursesCategoryController(NewCoursesCategoryFactory, toaster) {
        /* jshint validthis:true */
        var vm = this;

        vm.Submit=function () {
           
          var entry=new NewCoursesCategoryFactory();
          entry.CrsCats_Name=vm.CrsCats_Name;

           

            NewCoursesCategoryFactory.Save(entry,function (response) {
                angular.element(document).find("#txtCrsCategoryName").val("");
                toaster.pop(
                    {
                        type:"success",
                        title:"SPARK SCHOOL",
                        body:response.CrsCats_Name + "Category Added Successfully"
                    });

                    

            },function (response) {

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

        
    }
})();
(function(){
    'use strict';
    angular
        .module('DashboardApp')
        .factory('NewCoursesCategoryFactory', NewCoursesCategoryFactory)

        NewCoursesCategoryFactory.$inject = ['$resource'];

        function NewCoursesCategoryFactory($resource) {
          
            var accessToken=localStorage.getItem("accessToken");
            var authHeader={};
            authHeader.Authorization="Bearer "+accessToken;
            authHeader.token_type="bearer";
            authHeader.content_type="application/json";
         

        return $resource("http://localhost:8080/api/Dashboard/NewCourseCategory",{},{
            Save:
               {
                method: 'POST',
              
                headers:{

                    'Authorization' :authHeader.Authorization
                }
        
             

          
            }
        });
      

           
}
  
})();