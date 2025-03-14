'use strict';
define(function (require)
       {
           var module = require('components/logsplus/module');

           module.directive('logsPlusEntriesList', [
               function ()
               {
                   return {
                       restrict:    'E',
                       templateUrl: 'components/logsplus/views/log_entries_list.html'
                   };
               }
           ]);
       });