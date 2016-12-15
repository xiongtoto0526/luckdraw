import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import route from './route';
import controller from './controller';

import 'bootstrap/dist/css/bootstrap.css';
 
angular.module('luckydraw', [
  angularMeteor,
  uiRouter,

  route.name,
  controller.name
]);