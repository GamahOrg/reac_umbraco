angular.module("umbraco").controller('newsletterStudioExtensions.controller.customHtmlEmailControl.EditController',['$scope',function($scope) {

    var editVm = this;

    editVm.init = function(emailEditor, control) {
        editVm.control = control;
    }

    var evtHandler = $scope.$on('nsSelectedControlChanged', function ($event,control) {
        editVm.init(null, control);
    });

    $scope.$on('$destroy', function(event, args) {
        evtHandler();
    });

    return editVm;

}]);