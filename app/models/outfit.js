import DS from 'ember-data';
import Ember from 'ember';
const {
  isPresent
} = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),
  rate: DS.attr('number'),
  rev: DS.attr('string'),
  onEditMode: false,
  isFavorite: DS.attr('boolean', {
    defaultValue: false
  }),
  base64Images: DS.attr('string'),
  images: Ember.computed('base64Images', {
    get() {
      var imageString = this.get('base64Images');
      return Ember.isPresent(imageString) ? JSON.parse(imageString) : [];
    }
  }),
  defaultImage: Ember.computed('images', {
    get() {
      var image = this.get('images.firstObject');
      if (isPresent(image)) {
        return 'data:image/jpeg;base64,' + image.Base64Content;
      } else {
        return "assets/images/add-photo-image.png";
      }
    }
  }),

  imageBg: Ember.computed('defaultImage', function() {
   return Ember.String.htmlSafe('background:url(' + this.get('defaultImage')+ ') no-repeat center center');
 })

});
