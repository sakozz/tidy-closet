import Ember from 'ember';
import OutfitCtr from 'tidy-closet/mixins/outfit-ctr';

export default Ember.Controller.extend(OutfitCtr, {
  showCurrentOutfit: false,
  showOutfitForm: false,
  selectedTag: Ember.computed.alias('model'),
  tags: Ember.computed(function(){
    return this.store.peekAll('tag');
  }),
  outfits: Ember.computed('model.id', function(){
    return this.get('model.outfits');
  }),
  currentOutfit: Ember.computed(function(){
    return this.store.createRecord('outfit');
  }),
  actions:{
    addNewOutfit(){
      this.set('currentOutfit', function(){
        return this.store.createRecord('outfit');
      });
      this.set('showOutfitForm', true);
    },
    showOutfit(outfit){
      this.set('currentOutfit', outfit);
      this.set('showCurrentOutfit', true);
    },
    editOutfit(outfit){
      this.set('currentOutfit', outfit);
      this.set('showOutfitForm', true);
    }

  }
});
