import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const Ppl = new Mongo.Collection('ppl');
Meteor.methods({
  'removeAllPpl' : function () {
    Ppl.remove({});
  }
});