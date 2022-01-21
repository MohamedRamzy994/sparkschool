(function(){
    'use strict';

    angular
        .module('StudentApp')
        .controller('StudentAnalyticsController', StudentAnalyticsController)

    StudentAnalyticsController.$inject = ['$rootScope'];

    function StudentAnalyticsController($rootScope) {
        /* jshint validthis:true */
        var vm = this;

    
        $rootScope.studentNameActive=false;
        $rootScope.studentCoursesActive=false;
        $rootScope.studentAnalyticsActive=true;
        $rootScope.studentSettingsActive=false;
        $rootScope.studentLogoffActive=false;

       
    
       
        
    
    
    }
})();