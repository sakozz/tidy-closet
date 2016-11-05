import Ember from 'ember';

export default Ember.Controller.extend({
  newTagForm: false,
  tags: Ember.computed('model.@each', function(){
    return this.get('model').rejectBy('id', null);
  }),
  newTag: Ember.computed(function() {
    return this.store.createRecord('tag');
  }),
  actions: {
    addNewTag() {
        this.set('newTagForm', true);
      },
      saveTag() {
        let self = this;
        this.get('newTag').save().then(function() {
          self.set('newTagForm', false);
          self.set('newTag', self.store.createRecord('tag'));
          self.transitionToRoute('index');
        });
      }
  }

});
