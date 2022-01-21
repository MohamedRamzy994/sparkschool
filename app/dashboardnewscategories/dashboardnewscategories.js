(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewsCategoriesController', NewsCategoriesController)

        NewsCategoriesController.$inject = ['NewsCategoriesFactory','toaster','$ngConfirm','DeleteNewsCategoriesFactory','$route','ActivateNewsCategoriesFactory'];

    function NewsCategoriesController(NewsCategoriesFactory,toaster,$ngConfirm,DeleteNewsCategoriesFactory,$route,ActivateNewsCategoriesFactory) {
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

        vm.NewsCategories=[];
       
    
        NewsCategoriesFactory.query(function (response) {
        
         
        vm.NewsCategories=response;
        vm.totalItems = vm.NewsCategories.length;
          
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
                          
                            var entry = new DeleteNewsCategoriesFactory();
                            entry.Cat_Id=vm.Cat_Id;
                          

                            DeleteNewsCategoriesFactory.Delete(entry,function (response) {
                                toaster.pop(
                                    {
                                        type:"success",
                                        title:"SPARK SCHOOL",
                                        body:response.Cat_Name+" Category Deleted Successfuly !"
                                    });

                                    $route.reload();
                                
                            },function (response) {
                               
                                alert(response.status);
                            
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

            var entry=new ActivateNewsCategoriesFactory();
            entry.Cat_Id=Cat_Id;

            ActivateNewsCategoriesFactory.Activate(entry,function (response) {
                
                toaster.pop(
                    {
                        type:"success",
                        title:"SPARK SCHOOL",
                        body:response.Cat_Name + "New Activated Successfuly !"
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
        .factory('NewsCategoriesFactory', NewsCategoriesFactory)

        NewsCategoriesFactory.$inject = ['$resource','appsettings'];

    function NewsCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
     
       
       return  $resource(appsettings.serverPath+"/api/News/NewsCategories",{},{

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
        .factory('DeleteNewsCategoriesFactory', DeleteNewsCategoriesFactory)

        DeleteNewsCategoriesFactory.$inject = ['$resource','appsettings'];

    function DeleteNewsCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
       
       
       return  $resource(appsettings.serverPath+"/api/News/DeleteNewsCategory",{},{

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
        .factory('ActivateNewsCategoriesFactory', ActivateNewsCategoriesFactory)

        ActivateNewsCategoriesFactory.$inject = ['$resource','appsettings'];

    function ActivateNewsCategoriesFactory($resource,appsettings) {
   
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";

        return $resource(appsettings.serverPath+"/api/News/ActivateNewsCategory",{Cat_Id:"@Cat_Id"},{

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
//         .filter('NewsCategoriesFilter', NewsCategoriesFilter)

//         NewsCategoriesFilter.$inject=["$filter"]
//     function NewsCategoriesFilter($filter){

//         return function(list, arrayFilter, element){
//             if(arrayFilter){
//                 return $filter("filter")(list, function(listItem){
//                     return arrayFilter.indexOf(listItem[element]) != -1;
//                 });
//             }
//         };
//     }

// }());

