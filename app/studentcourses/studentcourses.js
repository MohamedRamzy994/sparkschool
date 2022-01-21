(function(){
    'use strict';

    angular
        .module('StudentApp')
        .controller('StudentCoursesController', StudentCoursesController)

    StudentCoursesController.$inject = ['$rootScope'];

    function StudentCoursesController($rootScope) {
        /* jshint validthis:true */
        var vm = this;

    
        $rootScope.studentNameActive=false;
        $rootScope.studentCoursesActive=true;
        $rootScope.studentAnalyticsActive=false;
        $rootScope.studentSettingsActive=false;
        $rootScope.studentLogoffActive=false;

       
    
       
        
    
    
    }
})();