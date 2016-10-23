import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gesture-recognizer', 'Integration | Component | gesture recognizer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gesture-recognizer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gesture-recognizer}}
      template block text
    {{/gesture-recognizer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
