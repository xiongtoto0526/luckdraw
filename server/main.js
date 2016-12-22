import { Meteor } from 'meteor/meteor';
import { Configs } from '/imports/api/configs';
import { Status } from '/imports/api/status';
import { Ppl } from '/imports/api/ppl';

import { defaultConfig } from '/imports/api/configsDefaults';
import { defaultStatus } from '/imports/api/statusDefaults';
import { defaultPpl } from '/imports/api/pplDefaults';

Meteor.startup(() => {
  if (Status.find().count() == 0) {
    defaultStatus.forEach((status) => {
      Status.insert(status);
    });
  }

  if (Configs.find().count() === 0) { 
    defaultConfig.forEach((config) => {
      Configs.insert(config);
    });
  }

  if (Ppl.find().count() === 0) { 
    defaultPpl.forEach((ppl) => {
      Ppl.insert(ppl);
    });
  }
});