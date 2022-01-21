(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewProgramesCategoryController',NewProgramesCategoryController)

        NewProgramesCategoryController.$inject = ['NewProgramesCategoryFactory','toaster'];

    function NewProgramesCategoryController(NewProgramesCategoryFactory, toaster) {
        /* jshint validthis:true */
        var vm = this;

        vm.Submit=function () {
           
          var Model=new NewProgramesCategoryFactory();
          Model.Cat_Name=vm.Cat_Name;

           

            NewProgramesCategoryFactory.Save(Model,function (response) {
                angular.element(document).find("#txtCategoryName").val("");
                toaster.pop(
                    {
                        type:"success",
                        title:"SPARK SCHOOL",
                        body:response.Cat_Name+ "Category Added Successfully"
                    });

                    

            },function (response) {

                console.log(response);
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
        .factory('NewProgramesCategoryFactory', NewProgramesCategoryFactory)

        NewProgramesCategoryFactory.$inject = ['$resource','appsettings'];

        function NewProgramesCategoryFactory($resource,appsettings) {
          
            var accessToken=localStorage.getItem("accessToken");
            var authHeader={};
            authHeader.Authorization="Bearer "+accessToken;
            authHeader.token_type="bearer";
            authHeader.content_type="application/json";
         
    
        return $resource(appsettings.serverPath+"/api/Programes/NewProgramesCategory",{Model:"@Model"},{
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