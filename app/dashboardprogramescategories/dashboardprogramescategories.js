(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('ProgramesCategoriesController', ProgramesCategoriesController)

        ProgramesCategoriesController.$inject = ['ProgramesCategoriesFactory','toaster','$ngConfirm','DeleteProgramesCategoriesFactory','$route','ActivateProgramesCategoriesFactory'];

    function ProgramesCategoriesController(ProgramesCategoriesFactory,toaster,$ngConfirm,DeleteProgramesCategoriesFactory,$route,ActivateProgramesCategoriesFactory) {
        /* jshint validthis:true */
        var vm = this;

        // Pagination Intialization Bootstrap-ui
        vm.totalItems = 0;
        vm.currentPage =1;
        vm.itemsPerPage = 10;
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

        vm.ProgramesCategories=[];
       
    
        ProgramesCategoriesFactory.query(function (response) {
        
         
        vm.ProgramesCategories=response;
        vm.totalItems = vm.ProgramesCategories.length;
          
        },function (response) {
           
           

            if (response.status==400||response.status==500||response.status==502||response.status==401) {
                
               
                toaster.pop(
                    {
                        type:"error",
                        title:"SPARK SCHOOL",
                        body:response.statusText
                    });

            } 
            

 

        });

       

        vm.Confirm=function (Cat_Id) {
           
            vm.Cat_Id=Cat_Id;
            $ngConfirm({
                title: 'Confirm!',
                content: '<strong>Do you want to Delete Category ?</strong>',
                buttons: {
                    Delete: {
                        text: 'Yes Sure',
                        btnClass: 'btn-blue',
                        action: function(){
                          
                            var entry = new DeleteProgramesCategoriesFactory();
                            entry.Cat_Id=vm.Cat_Id;
                          

                            DeleteProgramesCategoriesFactory.Delete(entry,function (response) {
                                toaster.pop(
                                    {
                                        type:"success",
                                        title:"SPARK SCHOOL",
                                        body:response.Cat_Name+" Category Deleted Successfuly !"
                                    });

                                    $route.reload();
                                
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
                    },
                    
                    close: function(scope, button){
                        // closes the modal
                    },
                }
            });
            
        }


        vm.Activate=function(Cat_Id) {

            var entry=new ActivateProgramesCategoriesFactory();
            entry.Cat_Id=Cat_Id;

            ActivateProgramesCategoriesFactory.Activate(entry,function (response) {
                
                toaster.pop(
                    {
                        type:"success",
                        title:"SPARK SCHOOL",
                        body:response.Cat_Name + "Programe Activated Successfuly !"
                    });
                    $route.reload();
                
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
        .factory('ProgramesCategoriesFactory', ProgramesCategoriesFactory)

        ProgramesCategoriesFactory.$inject = ['$resource','appsettings'];

    function ProgramesCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
     
       
       return  $resource(appsettings.serverPath+"/api/Programes/ProgramesCategories",{},{

        query:{
            
            method:"GET",
            headers:{
                
               'Authorization' :authHeader.Authorization
              
               },
           
               isArray:true
           

        }


       })
    }
})();


(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .factory('DeleteProgramesCategoriesFactory', DeleteProgramesCategoriesFactory)

        DeleteProgramesCategoriesFactory.$inject = ['$resource','appsettings'];

    function DeleteProgramesCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
       
       
       return  $resource(appsettings.serverPath+"/api/Programes/DeleteProgrameCategory",{Cat_Id:"@Cat_Id"},{

        Delete:{
            
            method:"DELETE",
            headers:{
                
               'Authorization' :authHeader.Authorization
               }
              

        }


       })
    }
})();

(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .factory('ActivateProgramesCategoriesFactory', ActivateProgramesCategoriesFactory)

        ActivateProgramesCategoriesFactory.$inject = ['$resource','appsettings'];

    function ActivateProgramesCategoriesFactory($resource,appsettings) {
   
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";

        return $resource(appsettings.serverPath+"/api/Programes/ActivateProgrameCategory",{Cat_Id:"@Cat_Id"},{

            Activate:{

                method:"POST",
                headers:{
                    
                   'Authorization' :authHeader.Authorization
                  
                }

            }



        });

    }
})();

// (function(){
//     'use strict';

//     angular
//         .module('DashboardApp')
//         .filter('ProgramesCategoriesFilter', ProgramesCategoriesFilter)

//         ProgramesCategoriesFilter.$inject=["$filter"]
//     function ProgramesCategoriesFilter($filter){

//         return function(list, arrayFilter, element){
//             if(arrayFilter){
//                 return $filter("filter")(list, function(listItem){
//                     return arrayFilter.indexOf(listItem[element]) != -1;
//                 });
//             }
//         };
//     }

// }());

