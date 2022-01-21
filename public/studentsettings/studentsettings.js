(function(){
    'use strict';

    angular
        .module('StudentApp')
        .controller('StudentSettingsController', StudentSettingsController)

    StudentSettingsController.$inject = ['$rootScope'];

    function StudentSettingsController($rootScope) {
        /* jshint validthis:true */
        var vm = this;

    
        $rootScope.studentNameActive=false;
        $rootScope.studentCoursesActive=false;
        $rootScope.studentAnalyticsActive=false;
        $rootScope.studentSettingsActive=true;
        $rootScope.studentLogoffActive=false;

       
    
       
        
    
    
    }
})();






(function () {
    'use strict';
    angular.module("StudentApp")
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