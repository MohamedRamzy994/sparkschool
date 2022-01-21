(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('JobsCategoriesController', JobsCategoriesController)

        JobsCategoriesController.$inject = ['JobsCategoriesFactory','toaster','$ngConfirm','DeleteJobsCategoriesFactory','$route','ActivateJobsCategoriesFactory'];

    function JobsCategoriesController(JobsCategoriesFactory,toaster,$ngConfirm,DeleteJobsCategoriesFactory,$route,ActivateJobsCategoriesFactory) {
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

        vm.JobsCategories=[];
       
    
        JobsCategoriesFactory.query(function (response) {
        
         
        vm.JobsCategories=response;
        vm.totalItems = vm.JobsCategories.length;
          
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
                          
                            var entry = new DeleteJobsCategoriesFactory();
                            entry.Cat_Id=vm.Cat_Id;
                          

                            DeleteJobsCategoriesFactory.Delete(entry,function (response) {
                                toaster.pop(
                                    {
                                        type:"success",
                                        title:"SPARK SCHOOL",
                                        body:response.Cat_Name+" Category Deleted Successfuly !"
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
                    },
                    
                    close: function(scope, button){
                        // closes the modal
                    },
                }
            });
            
        }


        vm.Activate=function(Cat_Id) {

            var entry=new ActivateJobsCategoriesFactory();
            entry.Cat_Id=Cat_Id;

            ActivateJobsCategoriesFactory.Activate(entry,function (response) {
                
                toaster.pop(
                    {
                        type:"success",
                        title:"SPARK SCHOOL",
                        body:response.Cat_Name + "Jobs Activated Successfuly !"
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
        .factory('JobsCategoriesFactory', JobsCategoriesFactory)

        JobsCategoriesFactory.$inject = ['$resource','appsettings'];

    function JobsCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
     
       
       return  $resource(appsettings.serverPath+"/api/Jobs/JobsCategories",{},{

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
        .factory('DeleteJobsCategoriesFactory', DeleteJobsCategoriesFactory)

        DeleteJobsCategoriesFactory.$inject = ['$resource','appsettings'];

    function DeleteJobsCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
       
       
       return  $resource(appsettings.serverPath+"/api/Jobs/DeleteJobsCategory",{Cat_Id:"@Cat_Id"},{

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
        .factory('ActivateJobsCategoriesFactory', ActivateJobsCategoriesFactory)

        ActivateJobsCategoriesFactory.$inject = ['$resource','appsettings'];

    function ActivateJobsCategoriesFactory($resource,appsettings) {
   
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";

        return $resource(appsettings.serverPath+"/api/Jobs/ActivateJobsCategory",{Cat_Id:"@Cat_Id"},{

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
//         .filter('JobsCategoriesFilter', JobsCategoriesFilter)

//         JobsCategoriesFilter.$inject=["$filter"]
//     function JobsCategoriesFilter($filter){

//         return function(list, arrayFilter, element){
//             if(arrayFilter){
//                 return $filter("filter")(list, function(listItem){
//                     return arrayFilter.indexOf(listItem[element]) != -1;
//                 });
//             }
//         };
//     }

// }());

