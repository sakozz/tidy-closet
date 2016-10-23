import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend(RecognizerMixin, {
  recognizers: 'pan tap press'
});
