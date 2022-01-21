


(function () {
    'use strict';
    angular.module("TeacherApp")
    .directive('ckEditor', function () {
        return {
            require: '?ngModel',
            link: function (scope, elm, attr, ngModel) {
                var ck = CKEDITOR.replace(elm[0]);
                if (!ngModel) return;
                ck.on('instanceReady', function () {
                    ck.setData(ngModel.$viewValue);
                });
                function updateModel() {
                    scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            }
            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);
    
            ngModel.$render = function (value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
    }); 

})();



(function() {
    'use strict';

    angular
        .module('TeacherApp')
        .controller('NewCourseController', NewCourseController);

        NewCourseController.$inject = ['AddNewCourseFactory','toaster','ActiveCoursesCategoriesFactory','$route'];
    function NewCourseController(AddNewCourseFactory,toaster,ActiveCoursesCategoriesFactory,$route) {
        var vm = this;



        vm.CoursesCategories=[];
        
     
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
        

        vm.Submit=function () {
           
       
                
            var URI=new AddNewCourseFactory();
            URI.Crs_Price=vm.Crs_Price;
            URI.Crs_Photo=vm.Crs_Photo.name;
            URI.Crs_Numlessons=vm.Crs_Numlessons;
            URI.Crs_Name=vm.Crs_Name;
            URI.Crs_Level=vm.Crs_Level;
            URI.Crs_Duration=vm.Crs_Duration;
            URI.Crs_Description=vm.Crs_Description;
            URI.CrsCats_Id=vm.CrsCats_Id;
           
            AddNewCourseFactory.Save(URI,function (response) {
              
                toaster.pop(
                    {
                        type:"success",
                        title:"SPARK SCHOOL",
                        body:URI.Crs_Name + " Course Added Successfuly !"
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
                

            })
            
        }
    }
})();

(function(){
    'use strict';

    angular
        .module('TeacherApp')
        .factory('AddNewCourseFactory', AddNewCourseFactory)

        AddNewCourseFactory.$inject = ['$resource','appsettings'];

    function AddNewCourseFactory($resource,appsettings) {

        var accessToken=localStorage.getItem("accessToken");
        var authHeader={};
        authHeader.Authorization="Bearer "+accessToken;
        authHeader.token_type="bearer";
        authHeader.content_type="application/json";
    
     var accessToken=localStorage.getItem("accessToken");
   

        return $resource(appsettings.serverPath+"/api/Dashboard/NewCourse",{},{
            Save:{
                method: 'POST',
                headers: { 
                    
                    'Authorization' : authHeader.Authorization

                    
                }
        
        
            }
     });
   
      
    }
})();

(function () {
    'use strict';
    angular.module("TeacherApp")
    .directive('ckEditor', function () {
        return {
            require: '?ngModel',
            link: function (scope, elm, attr, ngModel) {
                var ck = CKEDITOR.replace(elm[0]);
                if (!ngModel) return;
                ck.on('instanceReady', function () {
                    ck.setData(ngModel.$viewValue);
                });
                function updateModel() {
                    scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            }
            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);
    
            ngModel.$render = function (value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
    }); 

})();


(function(){
    'use strict';

    angular
        .module('TeacherApp')
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