(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('EventsController', EventsController)

        EventsController.$inject = ['EventsFactory','toaster',"ActivateEventsFactory","$route","$ngConfirm","ActiveEventsCategoriesFactory"];

    function EventsController(EventsFactory,toaster,ActivateEventsFactory,$route,$ngConfirm,ActiveEventsCategoriesFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.Events=[];
        vm.EventsCategories=[];


        
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
      
      ActiveEventsCategoriesFactory.query(function (response) {
        
       
       
      vm.EventsCategories=response;
        
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



        EventsFactory.Get(function (response) {
        
         vm.Events=response;
         vm.totalItems = vm.Events.length;
       
             
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

       vm.Activate=function (Event_Id) {
           
var entry=new ActivateEventsFactory();

entry.Event_Id=Event_Id;
ActivateEventsFactory.Activate(entry,function (response) {
            toaster.pop(
                {
                    type:"success",
                    title:"SPARK SCHOOL",
                    body:response.Event_Title + "Event Activated Successfuly !"
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
        
        
       vm.Confirm=function (Event_Id) {
        
         vm.Event_Id=Event_Id;
         $ngConfirm({
             title: 'Confirm!',
             content: '<strong>Do you want to Delete Event ?</strong>',
             buttons: {
                 Delete: {
                     text: 'Yes Sure',
                     btnClass: 'btn-blue',
                     action: function(){
                       
                         var entry = new EventsFactory();
                         entry.Event_Id=vm.Event_Id;
                       

                         EventsFactory.Delete(entry,function (response) {
                             toaster.pop(
                                 {
                                     type:"success",
                                     title:"SPARK SCHOOL",
                                     body:response.Event_Title+" Event Deleted Successfuly !"
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
        .factory('EventsFactory', EventsFactory)

        EventsFactory.$inject = ['$resource','appsettings'];

    function EventsFactory($resource,appsettings) {

        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        
       
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
    
        return $resource(appsettings.serverPath+'/api/Events/Events',{},{

            Get:{
                method:"GET",
                
                
                headers:{
                    
                 'Authorization' :authHeader.Authorization
                 
                 },
                 isArray:true



            },
            Delete:{
                method:"DELETE",
                url:appsettings.serverPath+"/api/Events/DeleteEvents",
                
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
        .factory('ActivateEventsFactory', ActivateEventsFactory)

        ActivateEventsFactory.$inject = ['$resource','appsettings'];

    function ActivateEventsFactory($resource,appsettings) {

        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
        return $resource(appsettings.serverPath+"/api/Events/ActivateEvents",{Event_Id:"@Event_Id"},{

            Activate:{
                url:appsettings.serverPath+"/api/Events/ActivateEvents",
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
        .factory('ActiveEventsCategoriesFactory', ActiveEventsCategoriesFactory)

        ActiveEventsCategoriesFactory.$inject = ['$resource','appsettings'];

    function ActiveEventsCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
      
   
       
       return  $resource(appsettings.serverPath+"/api/Events/ActiveEventsCategories",{},{

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



