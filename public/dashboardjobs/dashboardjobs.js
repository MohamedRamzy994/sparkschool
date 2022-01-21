(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('JobsController', JobsController)

        JobsController.$inject = ['JobsFactory','toaster',"ActivateJobsFactory","$route","$ngConfirm","ActiveJobsCategoriesFactory"];

    function JobsController(JobsFactory,toaster,ActivateJobsFactory,$route,$ngConfirm,ActiveJobsCategoriesFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.Jobs=[];
        vm.JobsCategories=[];


        
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
      
      ActiveJobsCategoriesFactory.query(function (response) {
        
       
       
      vm.JobsCategories=response;
        
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



        JobsFactory.Get(function (response) {
        
         vm.Jobs=response;
         vm.totalItems = vm.Jobs.length;
       
             
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

       vm.Activate=function (Job_Id) {
           
var entry=new ActivateJobsFactory();

entry.Job_Id=Job_Id;
ActivateJobsFactory.Activate(entry,function (response) {
            toaster.pop(
                {
                    type:"success",
                    title:"SPARK SCHOOL",
                    body:response.Job_Title + "Job Activated Successfuly !"
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
        
        
       vm.Confirm=function (Job_Id) {
        
         vm.Job_Id=Job_Id;
         $ngConfirm({
             title: 'Confirm!',
             content: '<strong>Do you want to Delete Job ?</strong>',
             buttons: {
                 Delete: {
                     text: 'Yes Sure',
                     btnClass: 'btn-blue',
                     action: function(){
                       
                         var entry = new JobsFactory();
                         entry.Job_Id=vm.Job_Id;
                       

                         JobsFactory.Delete(entry,function (response) {
                             toaster.pop(
                                 {
                                     type:"success",
                                     title:"SPARK SCHOOL",
                                     body:response.Job_Title+" Job Deleted Successfuly !"
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
        .factory('JobsFactory', JobsFactory)

        JobsFactory.$inject = ['$resource','appsettings'];

    function JobsFactory($resource,appsettings) {

        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        
       
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
    
        return $resource(appsettings.serverPath+'/api/Jobs/Jobs',{},{

            Get:{
                method:"GET",
                
                
                headers:{
                    
                 'Authorization' :authHeader.Authorization
                 
                 },
                 isArray:true



            },
            Delete:{
                method:"DELETE",
                url:appsettings.serverPath+"/api/Jobs/DeleteJobs",
                
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
        .factory('ActivateJobsFactory', ActivateJobsFactory)

        ActivateJobsFactory.$inject = ['$resource','appsettings'];

    function ActivateJobsFactory($resource,appsettings) {

        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
        return $resource(appsettings.serverPath+"/api/Jobs/ActivateJobs",{Job_Id:"@Job_Id"},{

            Activate:{
                url:appsettings.serverPath+"/api/Jobs/ActivateJobs",
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
        .factory('ActiveJobsCategoriesFactory', ActiveJobsCategoriesFactory)

        ActiveJobsCategoriesFactory.$inject = ['$resource','appsettings'];

    function ActiveJobsCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
      
   
       
       return  $resource(appsettings.serverPath+"/api/Jobs/ActiveJobsCategories",{},{

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



