
(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('EditEventController', EditEventController)

        EditEventController.$inject = ['EditEventFactory','toaster','$routeParams','$location','ActiveEventsCategoriesFactory'];

    function EditEventController(EditEventFactory,toaster,$routeParams,$location,ActiveEventsCategoriesFactory) {
        /* jshint validthis:true */
        var vm = this;

        vm.Event={};
        if ($routeParams.Event_Id!=null) {
            
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


                          
                      EditEventFactory.Get({Event_Id:$routeParams.Event_Id},function (response) {
                      
                            vm.Event=response;
                          
                            
                          
                           
                                
                            },function name(response) {
                                
                               
                                if (response.status==400||response.status==405||response.status==500||response.status==502||response.status==401) {
                                    
                                   
                                    toaster.pop(
                                        {
                                            type:"error",
                                            title:"SPARK SCHOOL",
                                            body:response.statusText
                                        });
                    
                                } 
                                
                
            
                                
                            })
                           

           vm.Submit=function () {

            var URI=new EditEventFactory();
            URI.Crs_Price=vm.Event.Crs_Price;
            URI.Crs_Photo=vm.Event.Crs_Photo.name;
            URI.Crs_Numlessons=vm.Event.Crs_Numlessons;
            URI.Crs_Name=vm.Event.Crs_Name;
            URI.Crs_Level=vm.Event.Crs_Level;
            URI.Crs_Duration=vm.Event.Crs_Duration;
            URI.Crs_Description=vm.Event.Crs_Description;
            URI.CrsCats_Id=vm.Event.CrsCats_Id;
            URI.Event_Id=$routeParams.Event_Id;

           
           
            EditEventFactory.Update(URI,function (response) {
              
             
                toaster.pop(
                    {
                        type:"success",
                        title:"SPARK SCHOOL",
                        body:URI.Crs_Name + " Event Edited Successfuly !"
                    });
                    $route.reload();

               
            },function (response) {
              
                console.log(response);

                if (response.status==400||response.status==500||response.status==502||response.status==401) {
                    
                 
                    toaster.pop(
                        {
                            type:"error",
                            title:"SPARK SCHOOL",
                            body: response.statusText
                        });
    
                } 
                

            });



                    }



                         
                        }
                       else{


                        $location.path("/dashboardEvents");


                       }   




    }
})();

(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .factory('EditEventFactory', EditEventFactory)

        EditEventFactory.$inject = ['$resource','appsettings'];

    function EditEventFactory($resource,appsettings) {
      
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";

        return $resource(appsettings.serverPath+"/api/Events/EditEvents",{Event_Id:"@Event_Id"},{

            Get:{
                method: "GET",
                headers: {

                    'Authorization': authHeader.Authorization
                }


            },
            Update: {
                method: "PUT",
                headers: {

                    'Authorization': authHeader.Authorization
                }


            }




        });

     
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