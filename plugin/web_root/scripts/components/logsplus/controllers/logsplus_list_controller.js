// noinspection t

'use strict';
define(function (require)
       {
           var module = require('components/logsplus/module');

           module.controller('logsPlusListCtrl', [
               '$scope',
               function ($scope)
               {
                   // Controller code goes here

                   $scope.loadLogEntries = () =>
                   {
                       console.log('AngularJS initialized');
                   }
               }
           ]);
       });