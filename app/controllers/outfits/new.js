import Ember from 'ember';
import OutfitCtr from 'tidy-closet/mixins/outfit-ctr';
import ImageManager from 'tidy-closet/mixins/image-manager';
export default Ember.Controller.extend(OutfitCtr, ImageManager, {
  actions: {
    takePhoto() {
      let model = this.get('model');
      this.captureImage().then(function(imageData) {
        var images = model.get('images') || [];
        var imgId = model.get('name') || 'new' + '__' + Date.now();
        images.addObject({
          FileName: imgId + '.jpeg',
          Description: '',
          ContentType: 'data:image/jpeg;base64',
          Base64Content: imageData
        });
        model.set('base64Images', JSON.stringify(images));
      }, function(error) {
        console.error(error);
      });
    },
    viewImage(image){

    }
  },

});
