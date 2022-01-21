(function() {
    'use strict';

   app.controller('RegisterController', RegisterController);

      RegisterController.$inject=['$location', 'AuthenticationBearerTokenFactory','AuthenticationFactory', 'toaster']; 
    function RegisterController($location,AuthenticationBearerTokenFactory,AuthenticationFactory,toaster) {
        var vm = this;

       

        //---------------------RegisterClieckEvent------------------//
        vm.Register=function () {
            
            if (vm.Category=="Student") {
                var Model={
                    "FirstName":vm.FirstName,
                    "LastName":vm.LastName,
                    "Email":vm.Email,
                    "Password":vm.Password,
                    "ConfirmPassword":vm.Password,
                    "BirthDate":vm.BirthDate,
                    "Gender":vm.Gender,
                    "Category":vm.Category
                }
            
                var AuthenticateResult=AuthenticationFactory.CreateAccount(Model);
                AuthenticateResult.then(function (response) {
                    var userInfo={
                        grant_type:"password",
                        username:Model.Email,
                        password:Model.Password
        
                    }

                    var AuthenticateResult=AuthenticationFactory.Login(userInfo);
                    AuthenticateResult.then(function (response) {
                     
                       AuthenticationBearerTokenFactory
                       .setProfile(response.data.userName,response.data.access_token,response.data.refresh_token);
        
                       $location.path("/registerthankyou");
              
        
                    },function (response) {
                       
                     
                        if (response.status==400||response.status==500||response.status==502||response.status==401) {
                            
                            vm.responseData+=response.statusText;
                            toaster.pop(
                                {
                                    type:"error",
                                    title:"SPARK SCHOOL",
                                    body:vm.responseData
                                });
        
                        } 
                    });
            
            
                },function (response) {
                    vm.responseData="Something Wrong happening now please try to change Email !"
                    if (response.status==400||response.status==500||response.status==502) {
                        
                        vm.responseData+=response.statusText;
                        toaster.pop(
                            {
                                type:"error",
                                title:"SPARK SCHOOL",
                                body:vm.responseData
                            });
                    } 
                })
            
            
            } 
            else if(vm.Category=="Instructor") {
                
            
                var Model={
                    "FirstName":vm.FirstName,
                    "LastName":vm.LastName,
                    "Email":vm.Email,
                    "Password":vm.Password,
                    "ConfirmPassword":vm.Password,
                    "BirthDate":vm.BirthDate,
                    "Gender":vm.Gender,
                    "Category":vm.Category
                    
                }
            
            
                var AuthenticateResult=AuthenticationFactory.CreateAccount(Model);
                AuthenticateResult.then(function (response) {
                    var userInfo={
                        grant_type:"password",
                        username:Model.Email,
                        password:Model.Password
        
                    }

                    var AuthenticateResult=AuthenticationFactory.Login(userInfo);
                    AuthenticateResult.then(function (response) {
                     
                       AuthenticationBearerTokenFactory
                       .setProfile(response.data.userName,response.data.access_token,response.data.refresh_token);
        
                       $location.path("/home");
                      
        
                    },function (response) {
                       
                     
                        if (response.status==400||response.status==500||response.status==502||response.status==401) {
                            
                            vm.responseData+=response.statusText;
                            toaster.pop(
                                {
                                    type:"error",
                                    title:"SPARK SCHOOL",
                                    body:vm.responseData
                                });
        
                        } 
                    });
                 
    
                },function (response) {
                  
                    vm.responseData="Something Wrong happening now please try to change Email !"
                    if (response.status==400||response.status==500||response.status==502) {
                        vm.responseData+=response.statusText;
                      
                        toaster.pop(
                            {
                                type:"error",
                                title:"SPARK SCHOOL",
                                body:vm.responseData
                            });
                    } 
    
                })
            
            
            
            }

        }            
        

    }

})();
//-------------------------- PostRegister Factory-------------
// (function(){
//     'use strict';

//     angular
//         .module('myApp')
//         .factory('PostRegisterFactory', PostRegisterFactory)

//     PostRegisterFactory.$inject = ['$resource'];

//     function PostRegisterFactory($resource) {
//         return $resource('http://192.168.1.2:8080/api/Account/Register');
      
//     }
// })();

// var Entry=new PostRegisterFactory();
// Entry.Email=Model.Email;
// Entry.Password=Model.Password;
// Entry.ConfirmPassword=Model.ConfirmPassword;
// Entry.FirstName=Model.FirstName;
// Entry.LastName=Model.LastName;
// Entry.Gender=Model.Gender;
// Entry.BirthDate=Model.BirthDate;
// Entry.Category=Model.Category;
// Entry.$save(function () {
    
//     $location.path("/home");


// });

// var Entry=new PostRegisterFactory();
// Entry.Email=Model.Email;
// Entry.Password=Model.Password;
// Entry.ConfirmPassword=Model.ConfirmPassword;
// Entry.FirstName=Model.FirstName;
// Entry.LastName=Model.LastName;
// Entry.Gender=Model.Gender;
// Entry.BirthDate=Model.BirthDate;
// Entry.Category=Model.Category;
// Entry.$save(function () {
    
//     $location.path("/home");


// });