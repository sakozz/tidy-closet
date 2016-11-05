import { Adapter } from 'ember-pouch';
import Ember from 'ember';

export default Adapter.extend({
  dbServices: Ember.inject.service('database-service'),
  db:null,

  init() {
    this._super(...arguments);
    this.set('db', this.get('dbServices.sqliteDb'));
  }
});
