import Ember from 'ember';

export default Ember.Route.extend({
  dbServices: Ember.inject.service('database-service'),
  beforeModel(){
    return this.get('dbServices').setupDb();
  }
});
