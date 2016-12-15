'use strict';

import DrawController from './drawController.js';
import ManagementController from './managementController.js';

export default angular
  .module('app.controllers', [])
  .controller('DrawController', DrawController)
  .controller('ManagementController', ManagementController);