
//---------------------- AuthenticationBearerToken Module-----------------------------

(function () {
    'use strict';

    angular.module('AuthenticationBearerToken', [
      
        "ngResource"

    ]).constant("appsettings",{
    serverPath :"http://localhost:50816"

    });
})();


//---------------------- userprofile service-----------------------------


(function(){
    'use strict';

    angular
        .module('AuthenticationBearerToken')
        .factory('AuthenticationBearerTokenFactory', AuthenticationBearerTokenFactory)

        AuthenticationBearerTokenFactory.$inject = [];

    function AuthenticationBearerTokenFactory() {
      
        var setProfile=function (username,token,refreshtoken) {
            
            localStorage.setItem("username",username);
            localStorage.setItem("accessToken",token);
             localStorage.setItem("refreshToken",refreshtoken);
        }

        var getProfile=function () {
            
            var profile={
                isLoggedIn: localStorage.getItem("accessToken")!=null,
                username: localStorage.getItem("username"),
                token: localStorage.getItem("accessToken"),
                refreshToken: localStorage.getItem("refreshToken")



            };

            return profile;

        }

        return{

            setProfile:setProfile,
            getProfile:getProfile

        }
    
    }
})();


//---------------------- login service-----------------------------
(function(){
    'use strict';

    angular
        .module('AuthenticationBearerToken')
        .factory('AuthenticationFactory', AuthenticationFactory)

        AuthenticationFactory.$inject = ['$http','appsettings'];

    function AuthenticationFactory($http,appsettings) {
    
        var vm=this;

        vm.CreateAccount=function (userInfo) {
    
            
            var response=$http({
                url:appsettings.serverPath+"/api/Account/Register",
                method:"POST",
                data:userInfo
              


            })

            return response;
        }

        vm.Login=function (userInfo) {
            
      
            var response=$http({
                url:appsettings.serverPath+"/token",
                method:"POST",
                data:"username="+userInfo.username+"&password="+userInfo.password+"&grant_type=password",
                headers:{

                    'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
                }
               
            });

            return response;
        }

        return {

            CreateAccount:vm.CreateAccount,
            Login:vm.Login

        }


    }
})();

(function(){
    'use strict';

    angular
        .module('AuthenticationBearerToken')
        .factory('AuthenticationBearerRoleFactory', AuthenticationBearerRoleFactory)

        AuthenticationBearerRoleFactory.$inject = ['$http','appsettings'];

    function AuthenticationBearerRoleFactory($http,appsettings) {
        var vm=this;

        vm.GetUserRole=function () {
            

                    
                    var response=$http({
                        url:appsettings.serverPath+"/api/Account/GetUserRole",
                        method:"GET",
                        params: { "UserName":  localStorage.getItem("username") }
                      
        
        
                    })
        
                    return response;
                }
    
                return {
                    
                               GetUserRole:vm.GetUserRole
                               
                    
                            }
    
            }
})();