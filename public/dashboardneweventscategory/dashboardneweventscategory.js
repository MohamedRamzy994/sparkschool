(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewEventsCategoryController',NewEventsCategoryController)

        NewEventsCategoryController.$inject = ['NewEventsCategoryFactory','toaster'];

    function NewEventsCategoryController(NewEventsCategoryFactory, toaster) {
        /* jshint validthis:true */
        var vm = this;

        vm.Submit=function () {
           
          var entry=new NewEventsCategoryFactory();
          entry.Cat_Name=vm.Cat_Name;

           

            NewEventsCategoryFactory.Save(entry,function (response) {
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
        .factory('NewEventsCategoryFactory', NewEventsCategoryFactory)

        NewEventsCategoryFactory.$inject = ['$resource','appsettings'];

        function NewEventsCategoryFactory($resource,appsettings) {
          
            var accessToken=localStorage.getItem("accessToken");
            var authHeader={};
            authHeader.Authorization="Bearer "+accessToken;
            authHeader.token_type="bearer";
            authHeader.content_type="application/json";
         
    
        return $resource(appsettings.serverPath+"/api/Events/NewEventsCategory",{},{
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