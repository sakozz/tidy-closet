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
    this.get('cordova').on('backbutton', this, 'goBack');
  },

  deactivate () {
    this.get('cordova').off('backbutton', this, 'goBack');
  },

  goBack(){
    let ctrl = this.get('controller');
    if(ctrl.showDialog){
      ctrl.set('showDialog', false);
    } else if(ctrl.showCurrentOutfit || ctrl.showOutfitForm){
      ctrl.setProperties({
        showCurrentOutfit: false,
        showOutfitForm: false
      });
    }else{
      window.history.back();
    }
  }

});
