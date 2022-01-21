(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('NewsController', NewsController)

        NewsController.$inject = ['NewsFactory','toaster',"ActivateNewsFactory","$route","$ngConfirm","ActiveNewsCategoriesFactory"];

    function NewsController(NewsFactory,toaster,ActivateNewsFactory,$route,$ngConfirm,ActiveNewsCategoriesFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.News=[];
        vm.NewsCategories=[];


        
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
      
      ActiveNewsCategoriesFactory.query(function (response) {
        
       
       
      vm.NewsCategories=response;
        
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



        NewsFactory.Get(function (response) {
        
         vm.News=response;
         vm.totalItems = vm.News.length;
       
             
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

       vm.Activate=function (New_Id) {
           
var entry=new ActivateNewsFactory();

entry.New_Id=New_Id;
ActivateNewsFactory.Activate(entry,function (response) {
            toaster.pop(
                {
                    type:"success",
                    title:"SPARK SCHOOL",
                    body:response.News_Title + "New Activated Successfuly !"
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
        
        
       vm.Confirm=function (New_Id) {
        
         vm.New_Id=New_Id;
         $ngConfirm({
             title: 'Confirm!',
             content: '<strong>Do you want to Delete New ?</strong>',
             buttons: {
                 Delete: {
                     text: 'Yes Sure',
                     btnClass: 'btn-blue',
                     action: function(){
                       
                         var entry = new NewsFactory();
                         entry.New_Id=vm.New_Id;
                       

                         NewsFactory.Delete(entry,function (response) {
                             toaster.pop(
                                 {
                                     type:"success",
                                     title:"SPARK SCHOOL",
                                     body:response.News_Title+" New Deleted Successfuly !"
                                 });

                                 $route.reload();
                             
                         },function (response) {
                             if (response.status==400||response.status==405||response.status==500||response.status==502||response.status==401) {
                                 
                                
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



    }
})();

(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .factory('NewsFactory', NewsFactory)

        NewsFactory.$inject = ['$resource','appsettings'];

    function NewsFactory($resource,appsettings) {

        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        
       
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
    
        return $resource(appsettings.serverPath+'/api/News/News',{},{

            Get:{
                method:"GET",
                
                
                headers:{
                    
                 'Authorization' :authHeader.Authorization
                 
                 },
                 isArray:true



            },
            Delete:{
                method:"DELETE",
                url:appsettings.serverPath+"/api/News/DeleteNews",
                
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
        .factory('ActivateNewsFactory', ActivateNewsFactory)

        ActivateNewsFactory.$inject = ['$resource','appsettings'];

    function ActivateNewsFactory($resource,appsettings) {

        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
        return $resource(appsettings.serverPath+"/api/News/ActivateNews",{New_Id:"@New_Id"},{

            Activate:{
                url:appsettings.serverPath+"/api/News/ActivateNews",
                method:"POST",
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
        .factory('ActiveNewsCategoriesFactory', ActiveNewsCategoriesFactory)

        ActiveNewsCategoriesFactory.$inject = ['$resource','appsettings'];

    function ActiveNewsCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
      
   
       
       return  $resource(appsettings.serverPath+"/api/News/ActiveNewsCategories",{},{

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



