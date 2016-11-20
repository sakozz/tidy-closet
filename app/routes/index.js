import Ember from 'ember';
const {
  Route,
  inject
} = Ember;

export default Route.extend({
  cordova: inject.service(),
  model(){
    return this.store.findAll('tag');
  },
  activate () {
    this.get('cordova').on('backbutton', this, 'goBack');
  },

  deactivate () {
    this.get('cordova').off('backbutton', this, 'goBack');
  },

  goBack(){
    let ctrl = this.get('controller');
    if(ctrl.newTagForm){
      ctrl.setProperties({
        newTagForm: false
      });
    }else{
      window.history.back();
    }
  }
});
