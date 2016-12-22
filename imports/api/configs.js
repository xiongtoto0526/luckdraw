import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const Configs = new Mongo.Collection('configs');
Meteor.methods({
  'removeAllConfig' : function () {
    Configs.remove({});
  }
});