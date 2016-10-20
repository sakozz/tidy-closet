import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    rate: DS.attr('number'),
    rev: DS.attr('string'),
    onEditMode: false,

});
