(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('CoursesCategoriesController', CoursesCategoriesController)

        CoursesCategoriesController.$inject = ['CoursesCategoriesFactory','toaster','$ngConfirm','DeleteCoursesCategoriesFactory','$route','ActivateCoursesCategoriesFactory'];

    function CoursesCategoriesController(CoursesCategoriesFactory,toaster,$ngConfirm,DeleteCoursesCategoriesFactory,$route,ActivateCoursesCategoriesFactory) {
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

        vm.CoursesCategories=[];
       
    
        CoursesCategoriesFactory.query(function (response) {
        
         
        vm.CoursesCategories=response;
        vm.totalItems = vm.CoursesCategories.length;
          
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

       

        vm.Confirm=function (CrsCats_Id) {
           
            vm.CrsCats_Id=CrsCats_Id;
            $ngConfirm({
                title: 'Confirm!',
                content: '<strong>Do you want to Delete Category ?</strong>',
                buttons: {
                    Delete: {
                        text: 'Yes Sure',
                        btnClass: 'btn-blue',
                        action: function(){
                          
                            var entry = new DeleteCoursesCategoriesFactory();
                            entry.CrsCats_Id=vm.CrsCats_Id;
                          

                            DeleteCoursesCategoriesFactory.Delete(entry,function (response) {
                                toaster.pop(
                                    {
                                        type:"success",
                                        title:"SPARK SCHOOL",
                                        body:response.CrsCats_Name+" Category Deleted Successfuly !"
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


        vm.Activate=function(CrsCats_Id) {

            var entry=new ActivateCoursesCategoriesFactory();
            entry.CrsCats_Id=CrsCats_Id;

            ActivateCoursesCategoriesFactory.Activate(entry,function (response) {
                
                toaster.pop(
                    {
                        type:"success",
                        title:"SPARK SCHOOL",
                        body:response.CrsCats_Name + "Course Activated Successfuly !"
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
        .factory('CoursesCategoriesFactory', CoursesCategoriesFactory)

        CoursesCategoriesFactory.$inject = ['$resource','appsettings'];

    function CoursesCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
     
       
       return  $resource(appsettings.serverPath+"/api/Dashboard/CoursesCategories",{},{

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
        .factory('DeleteCoursesCategoriesFactory', DeleteCoursesCategoriesFactory)

        DeleteCoursesCategoriesFactory.$inject = ['$resource','appsettings'];

    function DeleteCoursesCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
       
       
       return  $resource(appsettings.serverPath+"/api/Dashboard/DeleteCourseCategory",{},{

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
        .factory('ActivateCoursesCategoriesFactory', ActivateCoursesCategoriesFactory)

        ActivateCoursesCategoriesFactory.$inject = ['$resource','appsettings'];

    function ActivateCoursesCategoriesFactory($resource,appsettings) {
   
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";

        return $resource(appsettings.serverPath+"/api/Dashboard/ActivateCourseCategory",{CrsCats_Id:"@CrsCats_Id"},{

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
//         .filter('CoursesCategoriesFilter', CoursesCategoriesFilter)

//         CoursesCategoriesFilter.$inject=["$filter"]
//     function CoursesCategoriesFilter($filter){

//         return function(list, arrayFilter, element){
//             if(arrayFilter){
//                 return $filter("filter")(list, function(listItem){
//                     return arrayFilter.indexOf(listItem[element]) != -1;
//                 });
//             }
//         };
//     }

// }());

