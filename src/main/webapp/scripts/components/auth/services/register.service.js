'use strict';

angular.module('openajpportApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


