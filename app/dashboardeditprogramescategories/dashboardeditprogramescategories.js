(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('EditProgramesCategoryController',EditProgramesCategoryController)

        EditProgramesCategoryController.$inject = ['EditProgramesCategoryFactory','toaster','$routeParams'];

    function EditProgramesCategoryController(EditProgramesCategoryFactory, toaster,$routeParams) {
        /* jshint validthis:true */
        var vm = this;
       
        vm.Cat_Name="";
         
            if ($routeParams.Cat_Id!=null) {

              
          EditProgramesCategoryFactory.Get({Cat_Id:$routeParams.Cat_Id},function (response) {
                   
                vm.Cat_Name=response.Cat_Name;
              
                    
                },function name(response) {
                    
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

           
         
       

        vm.Submit=function () {
           
            if ($routeParams.Cat_Id!=null) {

                var entry=new EditProgramesCategoryFactory();
                entry.Cat_Name=vm.Cat_Name;
                entry.Cat_Id=$routeParams.Cat_Id;
      
                 
      
                  EditProgramesCategoryFactory.Update(entry,function (response) {
                    
                      toaster.pop(
                          {
                              type:"success",
                              title:"SPARK SCHOOL",
                              body:response.Cat_Name + "Category Edited Successfully"
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
      
                
            } else {
                
            }      

        }
        
    }
})();
(function(){
    'use strict';
    angular
        .module('DashboardApp')
        .factory('EditProgramesCategoryFactory', EditProgramesCategoryFactory)

        EditProgramesCategoryFactory.$inject = ['$resource','appsettings'];

        function EditProgramesCategoryFactory($resource,appsettings) {
          
            var accessToken=localStorage.getItem("accessToken");
            var authHeader={};
            authHeader.Authorization="Bearer "+accessToken;
            authHeader.token_type="bearer";
            authHeader.content_type="application/json";
         

        return $resource(appsettings.serverPath+"/api/Programes/EditProgramesCategory",{Cat_Id:"@Cat_Id"},{
            Update:
               {
                method: 'PUT',
              
                headers:{

                    'Authorization' :authHeader.Authorization
                }
        
             

          
            },
            Get:{

                method:"GET",

                headers:{

                    'Authorization' :authHeader.Authorization
                }

            }
        });
      

           
}
  
})();