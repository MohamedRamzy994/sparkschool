(function(){
    'use strict';

    angular
        .module('StudentApp')
        .controller('StudentIndexController', StudentIndexController)

    StudentIndexController.$inject = ['$rootScope'];

    function StudentIndexController($rootScope) {
        /* jshint validthis:true */
        var vm = this;
        $rootScope.studentNameActive=true;
        $rootScope.studentCoursesActive=false;
        $rootScope.studentAnalyticsActive=false;
        $rootScope.studentSettingsActive=false;
        $rootScope.studentLogoffActive=false;
       
        
    
    
    }
})();