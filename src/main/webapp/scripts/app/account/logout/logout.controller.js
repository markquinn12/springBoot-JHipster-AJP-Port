'use strict';

angular.module('openajpportApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
