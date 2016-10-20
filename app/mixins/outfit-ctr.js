import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    saveRecord(record) {
      let self = this;
      record.save().then(function(record) {
        record.set('onEditMode', false)
        self.transitionToRoute('outfits')
      });
    },
    deleteRecord(record) {
      let self = this;
      record.destroyRecord().then(function() {
        self.transitionToRoute('outfits')
      });
    },
    editRecord(record) {
      record.set('onEditMode', true);
    }
  }
});
