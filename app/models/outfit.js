import DS from 'ember-data';
import Ember from 'ember';
const {
  isPresent,
  computed
} = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),
  rate: DS.attr('number'),
  rev: DS.attr('string'),
  tags: DS.hasMany('tag'),
  isFavorite: DS.attr('boolean', {
    defaultValue: false
  }),
  hasImages: computed('images', function(){
    return this.get('images.length') > 0;
  }),
  base64Images: DS.attr('string'),
  images: computed('base64Images', {
    get() {
      var imageString = this.get('base64Images');
      return Ember.isPresent(imageString) ? JSON.parse(imageString) : [];
    }
  }),
  defaultImage: computed('images', {
    get() {
      var image = this.get('images.firstObject');
      if (isPresent(image)) {
        return 'data:image/jpeg;base64,' + image.Base64Content;
      } else {
        return "assets/images/add-photo-image.png";
      }
    }
  }),

  imageBg: computed('defaultImage', function() {
   return Ember.String.htmlSafe('background:url(' + this.get('defaultImage')+ ') no-repeat center center');
 })

});
