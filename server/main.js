import { Meteor } from 'meteor/meteor';
import { Configs, defaultConfig } from '/imports/api/configs';
import { Status, defaultStatus } from '/imports/api/status';
import { Ppl } from '/imports/api/ppl';

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

  console.log(Ppl.find().count());
});