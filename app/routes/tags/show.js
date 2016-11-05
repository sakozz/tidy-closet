import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
     return this.store.find('tag', params.id);
  },
  setupController(controller, model){
    controller.setProperties({
      model: model,
      showCurrentOutfit: false,
      showOutfitForm: false
    });
  }
});
