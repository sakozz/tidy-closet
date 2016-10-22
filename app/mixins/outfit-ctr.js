import Ember from 'ember';

export default Ember.Mixin.create({
  showDialog: false,
  dialogOrigin: '',
  actions: {
    saveRecord(record) {
      let self = this;
      record.save().then(function(record) {
        record.set('onEditMode', false);
        self.transitionToRoute('outfits');
      });
    },
    deleteRecord(record) {
      let self = this;
      record.destroyRecord().then(function() {
        self.transitionToRoute('outfits');
      });
    },
    editRecord(record) {
      record.set('onEditMode', true);
    },

    viewImage(record, imageIndex) {
      this.set('dialogOrigin', '.'+record.id + '-image-' + imageIndex);
      this.set('showDialog', true);
    },

    closeDialog() {
      this.set('showDialog', false);
    }
  },

  removeImage: function(image) {
    this.get('selectedSurfaces').forEach(function(surface) {
      if (Ember.isEqual(surface.id, image.FileName.split('__')[0])) {
        var attachments = surface.get('attachments').rejectBy('FileName', image.FileName);
        surface.set('base64Images', JSON.stringify(attachments));
        surface.set('attachments', attachments);
      }
    });

    this.get('applicationController').set('fullscreenImage', {});
    this.get('applicationController').set('isFullscreenMode', false);
  }
});
