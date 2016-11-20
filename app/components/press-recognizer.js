import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend( {
  press(e) {
    this.sendAction('onZonePressed')
  }

});
