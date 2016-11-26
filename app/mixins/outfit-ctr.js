import Ember from 'ember';
import ImageManager from 'tidy-closet/mixins/image-manager';
const {computed, isEqual, set} = Ember;

export default Ember.Mixin.create(ImageManager, {
  showDialog: false,
  showConfirmationDialog: false,
  confirmDialogOrigin: '',
  imageSelectionMode: computed('imageSelectionToggled', 'currentOutfit.id', function () {
    let selectedImages = this.get('currentOutfit.images').filterBy('isSelected');
    return selectedImages.length > 0;
  }),
  cardSelectionMode: computed('cardSelectionToggled', 'model.id', function () {
    let selectedCards = this.get('model.outfits').filterBy('isSelected');
    return selectedCards.length > 0;
  }),
  imageSelectionToggled: false,
  cardSelectionToggled: false,
  currentImageIndex: 0,
  dialogOrigin: '',
  actions: {
    saveRecord(record) {
      let self = this;
      var tag = this.get('selectedTag');
      record.get('tags').pushObject(tag);
      tag.get('outfits').pushObject(record);
      record.save().then(function () {
        tag.save().then(function () {
          self.setProperties({
            showCurrentOutfit: false,
            showOutfitForm: false,
          });
        });
      });
    },
    deleteRecord(record) {
      let self = this;
      record.destroyRecord().then(function () {
        self.transitionToRoute('outfits');
      });
    },
    editRecord(record) {
      record.set('onEditMode', true);
    },

    addToFavorite(record){
      record.set('isFavorite', !record.get('isFavorite'));
      record.save();
    },

    takePhoto(record) {
      // let record = this.get('record');
      this.captureImage().then(function (imageData) {
        var images = record.get('images') || [];
        var imgId = record.get('name') || 'new' + '__' + Date.now();
        images.addObject({
          FileName: imgId + '.jpeg',
          Description: '',
          ContentType: 'data:image/jpeg;base64',
          Base64Content: imageData
        });
        record.set('base64Images', JSON.stringify(images));
      }, function (error) {
        console.error(error);
      });
    },

    imagePressed(image){
      this.toggleProperty('imageSelectionToggled');
      set(image, 'isSelected', true);
    },

    toggleImageSelection(image){
      let selected = image.isSelected || false;
      this.toggleProperty('imageSelectionToggled');
      set(image, 'isSelected', !selected);
    },

    toggleCardSelection(outfit){
      let selected = outfit.isSelected || false;
      this.toggleProperty('cardSelectionToggled');
      set(outfit, 'isSelected', !selected);
    },
    outfitPressed(outfit){
      this.toggleProperty('cardSelectionToggled');
      set(outfit, 'isSelected', true);
    },

    viewImage(record, imageIndex) {
      this.setProperties({
        dialogOrigin: '.' + record.id + '-image-' + imageIndex,
        currentImageIndex: imageIndex,
        showDialog: true
      });
    },

    closeDialog() {
      this.set('showDialog', false);
    },

    removeImages: function (outfit) {
      const images = outfit.get('images').rejectBy('isSelected');
      outfit.set('base64Images', JSON.stringify(images));
      this.toggleProperty('imageSelectionToggled');
      outfit.save();
    },

    openConfirmation(confirmationType, selector){
      this.setProperties({
        confirmDialogOrigin: selector,
        confirmationType: confirmationType,
        showConfirmationDialog: true
      });
    },

    confirm(){
      this.send(this.get('confirmationType')); // confirmationType is named as action-name
      this.set('showConfirmationDialog', false);

    },
    closeConfirmation(){
      this.set('showConfirmationDialog', false);
    },

    deleteSelectedOutfits(){
      let self = this;
      var selectedOutfits = this.get('model.outfits').filterBy('isSelected');
      var tag = this.get('model');

      tag.get('outfits').removeObjects(selectedOutfits);
      tag.save().then(function () {
        selectedOutfits.forEach(function (outfit) {
          outfit.destroyRecord();
        });
        self.toggleProperty('cardSelectionToggled');
      });

    },
    changeCategory(){

    },

    favoriteSelected(){
      this.get('model.outfits').filterBy('isSelected').forEach(function (outfit) {
        outfit.set('isFavorite', true);
        outfit.save();
      });
    },
    unfavoriteSelected(){
      this.get('model.outfits').filterBy('isSelected').forEach(function (outfit) {
        outfit.set('isFavorite', false);
        outfit.save();
      });
    }

  }
});
