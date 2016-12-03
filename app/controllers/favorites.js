import OutfitCtr from 'tidy-closet/mixins/outfit-ctr';
const {
        Controller,
        computed
      } = Ember;

export default Controller.extend(OutfitCtr, {
  outfits: computed('model.@each.isFavorite', function(){
    return this.get('model').filterBy('isFavorite');
  })
});
