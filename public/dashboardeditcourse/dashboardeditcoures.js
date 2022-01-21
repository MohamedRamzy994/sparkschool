
(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .controller('EditCourseController', EditCourseController)

        EditCourseController.$inject = ['EditCourseFactory','toaster','$routeParams','$location','ActiveCoursesCategoriesFactory'];

    function EditCourseController(EditCourseFactory,toaster,$routeParams,$location,ActiveCoursesCategoriesFactory) {
        /* jshint validthis:true */
        var vm = this;

        vm.Course={};
        if ($routeParams.Crs_Id!=null) {
            
            ActiveCoursesCategoriesFactory.query(function (response) {
                
               
              vm.CoursesCategories=response;
                
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


                          
                      EditCourseFactory.Get({Crs_Id:$routeParams.Crs_Id},function (response) {
                      
                            vm.Course=response;
                          
                            
                          
                           
                                
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
                           

           vm.Submit=function () {

            var URI=new EditCourseFactory();
            URI.Crs_Price=vm.Course.Crs_Price;
            URI.Crs_Photo=vm.Course.Crs_Photo.name;
            URI.Crs_Numlessons=vm.Course.Crs_Numlessons;
            URI.Crs_Name=vm.Course.Crs_Name;
            URI.Crs_Level=vm.Course.Crs_Level;
            URI.Crs_Duration=vm.Course.Crs_Duration;
            URI.Crs_Description=vm.Course.Crs_Description;
            URI.CrsCats_Id=vm.Course.CrsCats_Id;
            URI.Crs_Id=$routeParams.Crs_Id;

           
           
            EditCourseFactory.Update(URI,function (response) {
              
             
                toaster.pop(
                    {
                        type:"success",
                        title:"SPARK SCHOOL",
                        body:URI.Crs_Name + " Course Edited Successfuly !"
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


                        $location.path("/dashboardcourses");


                       }   




    }
})();

(function(){
    'use strict';

    angular
        .module('DashboardApp')
        .factory('EditCourseFactory', EditCourseFactory)

        EditCourseFactory.$inject = ['$resource','appsettings'];

    function EditCourseFactory($resource,appsettings) {
      
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";

        return $resource(appsettings.serverPath+"/api/Dashboard/EditCourse",{},{

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
        .factory('ActiveCoursesCategoriesFactory', ActiveCoursesCategoriesFactory)

        ActiveCoursesCategoriesFactory.$inject = ['$resource','appsettings'];

    function ActiveCoursesCategoriesFactory($resource,appsettings) {
    
        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
     
       
       return  $resource(appsettings.serverPath+"/api/Dashboard/ActiveCoursesCategories",{},{

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