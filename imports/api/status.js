import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const Status = new Mongo.Collection('status');
Meteor.methods({
  "removeAllStatus" : function () {
    Status.remove({});
  }
});

export const defaultStatus = [{
  page: 'ready'
}];