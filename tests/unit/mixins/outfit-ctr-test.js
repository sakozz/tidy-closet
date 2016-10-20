import Ember from 'ember';
import OutfitCtrMixin from 'tidy-closet/mixins/outfit-ctr';
import { module, test } from 'qunit';

module('Unit | Mixin | outfit ctr');

// Replace this with your real tests.
test('it works', function(assert) {
  let OutfitCtrObject = Ember.Object.extend(OutfitCtrMixin);
  let subject = OutfitCtrObject.create();
  assert.ok(subject);
});
