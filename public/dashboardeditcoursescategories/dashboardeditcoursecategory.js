(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('EditCoursesCategoryController',EditCoursesCategoryController)

        EditCoursesCategoryController.$inject = ['EditCoursesCategoryFactory','toaster','$routeParams'];

    function EditCoursesCategoryController(EditCoursesCategoryFactory, toaster,$routeParams) {
        /* jshint validthis:true */
        var vm = this;
       
        vm.CrsCats_Name="";
         
            if ($routeParams.CrsCats_Id!=null) {

              
          EditCoursesCategoryFactory.Get({CrsCats_Id:$routeParams.CrsCats_Id},function (response) {
                   
                vm.CrsCats_Name=response.CrsCats_Name;
              
                    
                },function name(response) {
                    
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
           
            if ($routeParams.CrsCats_Id!=null) {

                var entry=new EditCoursesCategoryFactory();
                entry.CrsCats_Name=vm.CrsCats_Name;
                entry.CrsCats_Id=$routeParams.CrsCats_Id;
      
                 
      
                  EditCoursesCategoryFactory.Update(entry,function (response) {
                      angular.element(document).find("#txtCrsCategoryName").val("");
                      toaster.pop(
                          {
                              type:"success",
                              title:"SPARK SCHOOL",
                              body:response.CrsCats_Name + "Category Edited Successfully"
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
        .factory('EditCoursesCategoryFactory', EditCoursesCategoryFactory)

        EditCoursesCategoryFactory.$inject = ['$resource','appsettings'];

        function EditCoursesCategoryFactory($resource,appsettings) {
          
            var accessToken=localStorage.getItem("accessToken");
            var authHeader={};
            authHeader.Authorization="Bearer "+accessToken;
            authHeader.token_type="bearer";
            authHeader.content_type="application/json";
         

        return $resource(appsettings.serverPath+"/api/Dashboard/EditCourseCategory",{},{
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