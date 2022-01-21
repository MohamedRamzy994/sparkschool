(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('LogInController', LogInController);

    LogInController.$inject = ['$location', 'AuthenticationBearerTokenFactory','AuthenticationFactory', 'toaster'];

    function LogInController($location,AuthenticationBearerTokenFactory,AuthenticationFactory , toaster) {
        var vm = this;
        vm.responseData="";
        vm.userName="";
        vm.userEmail="";
        vm.userPassword="";
        vm.accessToken="";
        vm.refreshToken="";
    
        vm.Authenticate = function () {
           
            var userInfo={
                grant_type:"password",
                username:vm.Email,
                password:vm.Password

            }
            vm.responseData="";
            var AuthenticateResult=AuthenticationFactory.Login(userInfo);
            AuthenticateResult.then(function (response) {
               vm.userName=response.data.userName;
               AuthenticationBearerTokenFactory
               .setProfile(response.data.userName,response.data.access_token,response.data.refresh_token);

               $location.path("/home");
               window.location.reload();

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

            })

           

        }

    }
})();

// (function () {
//     'use strict';

//     angular
//         .module('myApp')
//         .factory('LogInPostFactory', LogInPostFactory);

//     LogInPost.$inject = ["$resource"];

//     function LogInPostFactory($resource) {


//         return $resource("http://192.168.1.2:8080/api/Account/CheckAuthentication");



//     }
// })();





            // try {
            //     debugger;

            //     var Model = {
            //         "Email": vm.Email,
            //         "Password": vm.Password

            //     }

            //     var Entry=new LogInPostFactory();
            //     Entry.Email=Model.Email;
            //     Entry.Password=Model.Password;
            //     Entry.$save(function (status) {

            //         $location.path("/home");
            //     },function (status) {
                    

            //         toaster.pop({
            //             type: "error",
            //             title: "SPARK SCHOOL",
            //             body: "UserName or Password incorrect !"
            //         });
            //     });
            // }
            //  catch (error) {


            //     toaster.pop({
            //         type: "error",
            //         title: "SPARK SCHOOL",
            //         body: error
            //     });

            // }