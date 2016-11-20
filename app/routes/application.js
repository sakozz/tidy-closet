import Ember from 'ember';
const {
  Route,
  inject
} = Ember;

export default Route.extend({
  dbServices: inject.service('database-service'),
  beforeModel(){
    return this.get('dbServices').setupDb();
  }
});
