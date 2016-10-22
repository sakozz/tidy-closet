import Ember from 'ember';

export default Ember.Mixin.create({
  captureImage(options) {
    options = options || {
      quality: 75,
      destinationType: navigator.camera.DestinationType.DATA_URL,
      targetWidth: Math.sqrt(16000000 / 9 * 10), //16:9 aspect ratio
      targetHeight: Math.sqrt(9000000 / 16 * 10),
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      allowEdit: false
    };

    return new Promise(function(resolve, reject) {
      navigator.camera.getPicture(
        function(imageData) {
          resolve(imageData);
        },
        function(e) {
          reject(e);
        },
        options
      );
    });
  },

  chooseImage(options) {
    options = options || {
      quality: 75,
      destinationType: navigator.camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.JPEG,
      allowEdit: false
    };
    return new Promise(function(resolve, reject) {
      navigator.camera.getPicture(
        function(imageData) {
          resolve(imageData);
        },
        function(e) {
          reject(e);
        },
        options
      );
    });
  }
});
