import Ember from 'ember';
const {
        Route,
        inject
      } = Ember;

export default Route.extend({
  cordova: inject.service(),
  model(params) {
    return this.store.find('tag', params.id);
  },

  setupController(controller, model){
    controller.setProperties({
      model: model,
      showCurrentOutfit: false,
      showOutfitForm: false
    });
  },
  activate () {
    this.get('cordova').on('backbutton', this, 'triggerHardwareBack');
  },

  deactivate () {
    this.get('cordova').off('backbutton', this, 'triggerHardwareBack');
  },

  triggerHardwareBack(){
    this.get('controller').send('goBack');
  }

});
