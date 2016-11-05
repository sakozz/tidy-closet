import DS from 'ember-data';

export default DS.Model.extend({
  name:        DS.attr('string'),
  description: DS.attr('string'),
  outfits:     DS.hasMany('outfit'),
  rev:         DS.attr('string')
});
