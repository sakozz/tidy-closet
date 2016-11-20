import Ember from 'ember';
import OutfitCtr from 'tidy-closet/mixins/outfit-ctr';
const {
  inject,
  Controller
} = Ember;

export default Controller.extend(OutfitCtr, {
  cordova: inject.service(),
  showCurrentOutfit: false,
  showOutfitForm: false,
  selectedTag: Ember.computed.alias('model'),
  tags: Ember.computed(function () {
    return this.store.peekAll('tag');
  }),
  outfits: Ember.computed('model.id', function () {
    return this.get('model.outfits');
  }),
  currentOutfit: Ember.computed(function () {
    return this.store.createRecord('outfit');
  }),

  actions: {
    addNewOutfit(){
      this.setProperties({
        showOutfitForm: true,
        showCurrentOutfit: true,
        currentOutfit: this.store.createRecord('outfit')
      });
    },
    showOutfit(outfit){
      this.set('currentOutfit', outfit);
      this.set('showCurrentOutfit', true);
    },
    editOutfit(outfit){
      this.setProperties({
        showOutfitForm: true,
        showCurrentOutfit: true,
        currentOutfit: outfit
      });
    }

  }
});
