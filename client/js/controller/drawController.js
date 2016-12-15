'use strict';

// @ngInject
import { Meteor } from 'meteor/meteor';
import { Configs, defaultConfig } from '/imports/api/configs';
import { Status, defaultStatus } from '/imports/api/status';
import { Ppl } from '/imports/api/ppl';

export default function($scope, $meteor, $reactive, $timeout, $interval) {
  'ngInject';
  
  $reactive(this).attach($scope);

  var vm = this;

  vm.helpers({
    dbConfigs() {
      return Configs.find({}, {sort: [["classSeq", "asc"],["roundSeq", "asc"]]}, {reactive: false});
    },
    dbStatus() {
      return Status.find({}, {}, {reactive: false});
    },
    dbLocalCandidates() {
      return Ppl.find({localAwardId: ""}, {}, {reactive: false});
    },
    dbGlobalCandidates() {
      return Ppl.find({globalAwardId: ""}, {}, {reactive: false});
    }
  });

  vm.getRoundDisp = function() {
    if (vm.dbStatus[0].page == 'running') {
      return vm.nextDraw.class + ' - ' + vm.nextDraw.round;
    } else if (vm.dbStatus[0].page == 'result') {
      var lastFinished = _.find(angular.copy(vm.dbConfigs).reverse(), (config) => {
        return config.finished == true;
      });
      return lastFinished.class + ' - ' + lastFinished.round;
    }
    return 'test';
  };

  vm.enhanceDbConfigs = function() {
    vm.enhancedConfigs = angular.copy(vm.dbConfigs);
    var groupedConfigs = _.values(_.groupBy(vm.enhancedConfigs, 'classSeq'));
    _.each(groupedConfigs, function(configs) {
      _.each(configs, function(config, index, group){
        config.classLength = group.length;
        if(index == 0) {
          config.firstOfClass = true;
        }
      });
    });
    
    var nextDraw = _.find(vm.enhancedConfigs, (config) => {
      return !config.finished;
    });
    vm.nextDraw = nextDraw;
    if(vm.nextDraw) {
      vm.nextDraw.nextDraw = true
    };
  };

  vm.init = function() {
    $scope.$watch('vm.dbConfigs', () => {
      vm.enhanceDbConfigs();
    }, true);
    $scope.$watch('vm.dbStatus', (newStatus, oldStatus) => {
      if(oldStatus[0] && oldStatus[0].page != 'running' && newStatus[0] && newStatus[0].page == 'running') {
        vm.sampleInter = $interval(() => {
          if (vm.nextDraw.scope == '小西山居') {
            vm.candidates = _.sample(vm.dbLocalCandidates,vm.nextDraw.ppl);
          } else if(vm.nextDraw.scope == '大西山居') {
            vm.candidates = _.sample(vm.dbGlobalCandidates,vm.nextDraw.ppl);
          }
        }, 50);
      } else if(oldStatus[0] && oldStatus[0].page == 'running' && newStatus[0] && newStatus[0].page == 'result') {
        debugger;
        $interval.cancel(vm.sampleInter);
        var lastFinished = _.find(angular.copy(vm.dbConfigs).reverse(), (config) => {
          return config.finished == true;
        });
        if(lastFinished.scope = '小西山居') {
          _.each(vm.candidates, (candidate) => {
            Ppl.update({_id: candidate._id}, {$set:{localAwardId: lastFinished._id}});
          });
        } else if (lastFinished.scope = '大西山居') {
          _.each(vm.candidates, (candidate) => {
            Ppl.update({_id: candidate._id}, {$set:{globalAwardId: lastFinished._id}});
          });
        };
      }
    }, true);
  };

  vm.init();
}