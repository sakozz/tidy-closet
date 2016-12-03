import Ember from 'ember';
import OutfitCtr from 'tidy-closet/mixins/outfit-ctr';
const {
  inject,
  computed,
  Controller
} = Ember;

export default Controller.extend(OutfitCtr, {
  cordova: inject.service(),
  showCurrentOutfit: false,
  showOutfitForm: false,

  tags: computed(function () {
    return this.store.peekAll('tag');
  }),
  selectedTag: computed.alias('model'),

  outfits: computed('model.id', function () {
    return this.get('model.outfits');
  })

});
