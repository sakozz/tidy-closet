import Ember from 'ember';
import ImageManagerMixin from 'tidy-closet/mixins/image-manager';
import { module, test } from 'qunit';

module('Unit | Mixin | image manager');

// Replace this with your real tests.
test('it works', function(assert) {
  let ImageManagerObject = Ember.Object.extend(ImageManagerMixin);
  let subject = ImageManagerObject.create();
  assert.ok(subject);
});
