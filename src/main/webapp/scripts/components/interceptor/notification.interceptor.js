 'use strict';

angular.module('openajpportApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-openajpportApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-openajpportApp-params')});
                }
                return response;
            },
        };
    });