'use strict';
define(function (require)
       {
           var module = require('components/eslogs/module');

           module.directive('esLogsEntriesList', [
               function ()
               {
                   return {
                       restrict:    'E',
                       templateUrl: 'components/eslogs/views/log_entries_list.html'
                   };
               }
           ]);
       });